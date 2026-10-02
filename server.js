const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, "data");
const dataFile = path.join(dataDir, "inquiries.json");

const STUDIO_EMAIL = "admin@diaittech.online";
const seats = new Set(["client-partner", "engineering", "project"]);
const seatLabels = {
  "client-partner": "Client partner — 30%",
  engineering: "Engineering — 70%",
  project: "Project inquiry",
};
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
  if (inquiry.message.length < 1) {
    errors.message = "Add a few sentences so we know how to reply.";
  }

  return { inquiry, errors };
}

function pageOrigin(req) {
  const forwarded = req.get("x-forwarded-proto");
  const proto = forwarded ? forwarded.split(",")[0].trim() : req.protocol || "https";
  const host = req.get("x-forwarded-host") || req.get("host") || "diaittech.online";
  return `${proto}://${host}`;
}

async function sendToStudio(record, req) {
  const seat = seatLabels[record.seat] || record.seat;
  const origin = pageOrigin(req);
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(STUDIO_EMAIL)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: origin,
      Referer: `${origin}/`,
      "User-Agent": "Mozilla/5.0 (compatible; DiamondIT/1.0)",
    },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({
      name: record.name,
      email: record.email,
      seat,
      location: record.location || "Not provided",
      platforms: record.platforms || "Not provided",
      message: record.message,
      _subject: `New Diamond IT inquiry from ${record.name}`,
      _template: "table",
      _captcha: "false",
      _replyto: record.email,
    }),
  });

  const payload = await response.json().catch(() => ({}));
  const message = String(payload.message || "");
  const rejected = !response.ok || /will not work|could not be delivered|invalid/i.test(message);
  if (rejected) {
    const error = new Error(message || "Mail delivery failed.");
    error.detail = payload;
    throw error;
  }
}

app.post("/api/contact", async (req, res) => {
  const wantsHtml = !req.is("application/json");

  if (clean(req.body.company_website, 200)) {
    if (wantsHtml) return res.redirect("/?sent=1#contact");
    return res.json({ ok: true });
  }

  const { inquiry, errors } = validate(req.body);
  if (Object.keys(errors).length) {
    if (wantsHtml) return res.status(400).redirect("/?error=invalid#contact");
    return res.status(400).json({ ok: false, errors });
  }

  const record = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    ...inquiry,
    receivedAt: new Date().toISOString(),
  };

  try {
    await sendToStudio(record, req);
  } catch (error) {
    console.error("Contact email failed:", error.message);
    const errors = { form: "We couldn't deliver that message to the studio inbox. Try again in a moment." };
    if (wantsHtml) return res.status(502).redirect("/?error=mail#contact");
    return res.status(502).json({ ok: false, errors });
  }

  try {
    fs.mkdirSync(dataDir, { recursive: true });
    const all = readInquiries();
    all.push(record);
    fs.writeFileSync(dataFile, JSON.stringify(all, null, 2));
  } catch (error) {
    console.error("Could not save a local copy of the inquiry:", error.message);
  }

  if (wantsHtml) return res.redirect("/?sent=1#contact");
  return res.json({ ok: true, id: record.id });
});

app.listen(PORT, () => {
  console.log(`Diamond IT is running at http://localhost:${PORT}`);
});
