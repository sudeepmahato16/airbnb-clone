import { NextRequest, NextResponse } from "next/server";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { sendMail } from "@/lib/sendmail";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const templatePath = path.join(
      __dirname,
      "../../../email-templates/reservation-confirmation.ejs"
    );

    const html = await ejs.renderFile(templatePath, {
      guestName: data.guestName,

      hotelName: data.hotelName,
      reservationId: data.reservationId,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      totalPrice: data.totalPrice,
      hotelAddress: data.hotelAddress,
    });

    // Send email
    await sendMail({
      html,
      email: "sudeepmahato456@gmail.com",
      sendTo: data.sendTo,
      subject: `You're all set! ${data.title} reservation confirmed`,
    });

    return NextResponse.json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
