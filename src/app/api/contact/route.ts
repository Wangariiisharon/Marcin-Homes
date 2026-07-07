import { NextResponse } from "next/server";
import AfricasTalking from "africastalking";

const africastalking = AfricasTalking({
  apiKey: process.env.AT_API_KEY!,
  username: process.env.AT_USERNAME!, // "sandbox" in dev
});

const sms = africastalking.SMS;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const message = `
New Enquiry:
Name: ${data.first} ${data.last}
Email: ${data.email}
Phone: ${data.phone}
Interest: ${data.interest}
Message: ${data.message}
`;

    await sms.send({
      to: ["+254736620585"],
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
