import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  budgets,
  contactRoles,
  projectTypes,
  validateInquiry,
  type Inquiry,
} from "@/lib/contact";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "inquiries.json");

type InquiryRecord = Inquiry & { id: string; receivedAt: string };

async function sendToSlack(record: InquiryRecord) {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL;
  if (!token || !channel) throw new Error("Slack is not configured.");

  const fullName = `${record.firstName} ${record.lastName}`.trim();
  const lines =
    record.role === "partner"
      ? [
          "*New Diamond IT partner application*",
          `*Name:* ${fullName}`,
          `*Email:* ${record.email}`,
          `*Phone:* ${record.phone}`,
          `*Region:* ${record.region || "Not provided"}`,
          `*Platforms:* ${record.platforms || "Not provided"}`,
          `*Message:*\n${record.message}`,
        ]
      : [
          "*New Diamond IT client inquiry*",
          `*Name:* ${fullName}`,
          `*Email:* ${record.email}`,
          `*Phone:* ${record.phone}`,
          `*Company:* ${record.company || "Not provided"}`,
          `*Project:* ${record.projectType ? projectTypes[record.projectType] : "Not provided"}`,
          `*Budget:* ${record.budget ? budgets[record.budget] : "Not provided"}`,
          `*Message:*\n${record.message}`,
        ];

  const text = [`*Role:* ${contactRoles[record.role]}`, ...lines].join("\n");

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
    throw new Error(payload.error || `Slack responded with ${response.status}.`);
  }
}

async function saveLocalCopy(record: InquiryRecord) {
  try {
    await mkdir(dataDir, { recursive: true });
    const all: InquiryRecord[] = await readFile(dataFile, "utf8")
      .then((raw) => JSON.parse(raw))
      .catch(() => []);
    all.push(record);
    await writeFile(dataFile, JSON.stringify(all, null, 2));
  } catch (error) {
    console.error("Could not save a local copy of the inquiry:", (error as Error).message);
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json(
      { ok: false, errors: { form: "Send the form as JSON." } },
      { status: 400 },
    );
  }

  // Honeypot: bots fill the hidden field, people don't.
  if (String(body.company_website ?? "").trim()) return Response.json({ ok: true });

  const { inquiry, errors } = validateInquiry(body);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const record: InquiryRecord = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    ...inquiry,
    receivedAt: new Date().toISOString(),
  };

  try {
    await sendToSlack(record);
  } catch (error) {
    console.error("Contact post failed:", (error as Error).message);
    return Response.json(
      { ok: false, errors: { form: "We couldn't send your message. Try again in a moment." } },
      { status: 502 },
    );
  }

  await saveLocalCopy(record);
  return Response.json({ ok: true, id: record.id });
}
