import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: NextRequest) {
  const body = await request.json();
  await resend.emails.send({
    from: body.from,
    to: "papuirdalego@gmail.com",
    subject: "...",
    react: <WelcomeTemplate name="..." />,
  });
  return NextResponse.json({});
}
