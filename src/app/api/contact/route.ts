import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const MAX_BODY_CHARS = 20_000;

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(50).optional(),
  subject: z.string().trim().min(3).max(150).regex(/^[^\r\n]+$/),
  message: z.string().trim().min(20).max(5000),
  privacy: z.literal(true),
});

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_CHARS) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 422 }
    );
  }

  const { name, company, email, phone, subject, message } = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY missing, submission not delivered");
    return NextResponse.json({ error: "Mail delivery not configured" }, { status: 503 });
  }

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "noreply@lederer-elastic.de",
        to: process.env.CONTACT_TO_EMAIL ?? "info@lederer-elastic.de",
        reply_to: email,
        subject: `Kontaktanfrage: ${subject}`,
        text: `Name: ${name}\nFirma: ${company ?? "-"}\nE-Mail: ${email}\nTelefon: ${phone ?? "-"}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    console.error("[contact] mail request failed:", err);
    return NextResponse.json({ error: "Mail delivery failed" }, { status: 502 });
  }

  if (!res.ok) {
    console.error("[contact] mail provider rejected:", res.status, await res.text());
    return NextResponse.json({ error: "Mail delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
