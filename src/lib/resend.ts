import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM =
  process.env.RESEND_FROM || "SCP GEOLUMIERE <noreply@geolumiere.bj>";

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  await resend.emails.send({
    from: FROM,
    to: Array.isArray(payload.to) ? payload.to : [payload.to],
    subject: payload.subject,
    html: payload.html,
  });
}

export async function sendEmails(payloads: EmailPayload[]): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;
  await Promise.all(payloads.map((p) => sendEmail(p)));
}
