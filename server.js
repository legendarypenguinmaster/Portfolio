const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, "data");
const dataFile = path.join(dataDir, "inquiries.json");

loadEnvFile();

const seats = new Set(["client-partner", "engineering", "project"]);
const seatLabels = {
  "client-partner": "Client partner — 30%",
  engineering: "Engineering — 70%",
  project: "Project inquiry",
};
app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ extended: false, limit: "24kb" }));
app.use(express.static(path.join(__dirname, "public")));

function loadEnvFile() {
  const file = path.join(__dirname, ".env");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

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

async function sendToSlack(record) {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL;
  if (!token || !channel) {
    throw new Error("Slack is not configured.");
  }

  const seat = seatLabels[record.seat] || record.seat;
  const text = [
    "*New Diamond IT inquiry*",
    `*Name:* ${record.name}`,
    `*Email:* ${record.email}`,
    `*Seat:* ${seat}`,
    `*Location:* ${record.location || "Not provided"}`,
    `*Platforms:* ${record.platforms || "Not provided"}`,
    `*Message:*\n${record.message}`,
  ].join("\n");

  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({ channel, text }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.ok === false) {
    const error = new Error(payload.error || " did not accept the message.");
    error.detail = payload.error || response.status;
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
    await sendToSlack(record);
  } catch (error) {
    console.error("Contact post failed:", error.message);
    const errors = { form: "We couldn't post that message to Slack. Try again in a moment." };
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
