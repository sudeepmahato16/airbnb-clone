import { NextResponse } from "next/server";
import { db } from "@/libs/db";

interface IParams {
  label?: string;
}

export const GET = async (_req: Request, { params }: { params: IParams }) => {
  try {
    const { label } = params;
    if (!label) {
      return new NextResponse("Please provide us country name", {
        status: 401,
      });
    }

    const country = await db.country.findFirst({
      where: {
        label,
      },
    });

    if (!country)
      return new NextResponse("Country not found!", { status: 401 });

    return NextResponse.json(country);
  } catch (error) {
    return new NextResponse("Something went wrong!", { status: 500 });
  }
};
