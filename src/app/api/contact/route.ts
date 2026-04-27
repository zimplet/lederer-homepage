import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(20),
  privacy: z.literal(true),
});

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
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

  // ── Production: swap the block below for a real transporter ───────────────
  // Example with Resend (npm i resend):
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "noreply@lederer-elastic.de",
  //     to: "info@lederer-elastic.de",
  //     replyTo: email,
  //     subject: `Kontaktanfrage: ${subject}`,
  //     text: `Name: ${name}\nFirma: ${company}\nEmail: ${email}\nTel: ${phone}\n\n${message}`,
  //   });
  // ─────────────────────────────────────────────────────────────────────────
  console.log("[contact] New submission:", { name, company, email, phone, subject, message });

  return NextResponse.json({ success: true });
}
