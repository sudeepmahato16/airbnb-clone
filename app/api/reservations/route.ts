import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/libs/db";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await req.json();
  const { listing, startDate, endDate, totalPrice } = body;

  if (!listing || !startDate || !endDate || !totalPrice)
    return NextResponse.error();

    const listingAndReservation = await db.listing.update({
      where: {
        id: listing
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          }
        }
      }
    });
  return NextResponse.json(listingAndReservation);
};
