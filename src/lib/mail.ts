import { Resend } from "resend";

const FROM = process.env.NEWSLETTER_FROM_EMAIL || "Haru <newsletter@example.com>";

export function isMailConfigured() {
  return !!process.env.RESEND_API_KEY;
}

export async function sendNewsletter({
  to,
  subject,
  html,
}: {
  to: string[];
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Resend's batch send caps at 100 recipients per call — chunk larger lists.
  const chunks: string[][] = [];
  for (let i = 0; i < to.length; i += 100) chunks.push(to.slice(i, i + 100));

  for (const chunk of chunks) {
    await resend.emails.send({
      from: FROM,
      to: FROM, // send to self, bcc the real list so subscribers don't see each other
      bcc: chunk,
      subject,
      html,
    });
  }
}
