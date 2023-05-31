import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import Reservation from "@/models/reservation";
import Listing from "@/models/listing";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await req.json();
  const { listing, startDate, endDate, totalPrice } = body;

  if (!listing || !startDate || !endDate || !totalPrice)
    return NextResponse.error();

  const reservation = await Reservation.create({
    listing,
    startDate,
    endDate,
    totalPrice,
    user: currentUser._id,
  });

  const updatedListing = await Listing.findByIdAndUpdate(
    listing,
    {
      $push: {
        reservations: reservation._id,
      },
    },
    { new: true }
  );

  return NextResponse.json(updatedListing);
};
