import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import Listing from "@/models/listing";
import User from "@/models/user";
import Reservation from "@/models/reservation";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await Listing.deleteOne({
    _id: listingId,
    user: currentUser._id,
  });

  const reservations = await Reservation.deleteMany({
    listing: listingId,
  })

  return NextResponse.json(listing);
}
