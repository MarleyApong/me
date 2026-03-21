import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio <noreply@mlya.me>",
    to: "marlexapong90@gmail.com",
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #f5a623;">Nouveau message depuis mlya.me</h2>
        <p><strong>De :</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <hr style="border-color: #333;" />
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
