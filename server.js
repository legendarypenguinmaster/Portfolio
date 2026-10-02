const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, "data");
const dataFile = path.join(dataDir, "inquiries.json");

const seats = new Set(["client-partner", "engineering", "project"]);
const hits = new Map();

app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ extended: false, limit: "24kb" }));
app.use(express.static(path.join(__dirname, "public")));

function readInquiries() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
  } catch {
    return [];
  }
}

function clean(value, max) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function clientKey(req) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function limited(req) {
  const key = clientKey(req);
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 5) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

function validate(body) {
  const inquiry = {
    name: clean(body.name, 80),
    email: clean(body.email, 120).toLowerCase(),
    seat: clean(body.seat, 40),
    location: clean(body.location, 80),
    platforms: clean(body.platforms, 160),
    message: clean(body.message, 2000),
  };
  const errors = {};

  if (inquiry.name.length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!seats.has(inquiry.seat)) errors.seat = "Choose a seat.";
  if (inquiry.message.length < 20) {
    errors.message = "Add a few sentences so we know how to reply.";
  }

  return { inquiry, errors };
}

app.post("/api/contact", (req, res) => {
  const wantsHtml = !req.is("application/json");

  if (clean(req.body.company_website, 200)) {
    if (wantsHtml) return res.redirect("/?sent=1#contact");
    return res.json({ ok: true });
  }

  if (limited(req)) {
    const errors = { form: "Too many messages from this network. Try again shortly." };
    if (wantsHtml) return res.status(429).redirect("/?error=rate#contact");
    return res.status(429).json({ ok: false, errors });
  }

  const { inquiry, errors } = validate(req.body);
  if (Object.keys(errors).length) {
    if (wantsHtml) return res.status(400).redirect("/?error=invalid#contact");
    return res.status(400).json({ ok: false, errors });
  }

  fs.mkdirSync(dataDir, { recursive: true });
  const record = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    ...inquiry,
    receivedAt: new Date().toISOString(),
  };
  const all = readInquiries();
  all.push(record);
  fs.writeFileSync(dataFile, JSON.stringify(all, null, 2));

  if (wantsHtml) return res.redirect("/?sent=1#contact");
  return res.json({ ok: true, id: record.id });
});

app.listen(PORT, () => {
  console.log(`Diamond IT is running at http://localhost:${PORT}`);
});
