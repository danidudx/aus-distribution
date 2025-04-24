import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/nodemailer";

export async function POST(request) {
  try {
    const formData = await request.json();
    const result = await sendInquiryEmail(formData);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
