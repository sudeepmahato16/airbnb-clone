import { Types } from "mongoose";
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import Reservation from "@/models/reservation";
import Listing from "@/models/listing";

interface IParams {
  reservationId?: string;
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string")
    throw new Error("Invalid ID");

  const reservation = await Reservation.findById({
    _id: reservationId,
  }).populate("listing");

  if (!reservation) throw new Error("Reservation not found!");

  if (
    reservation.user.toString() === currentUser._id ||
    reservation.listing?.user.toString() === currentUser._id
  ) {
    await Reservation.deleteOne({ _id: reservationId });
    await Listing.findByIdAndUpdate(
      {
        _id: reservation?.listing._id,
      },
      {
        $pull: {
          reservations: new Types.ObjectId(reservationId),
        },
      }
    );

    return NextResponse.json({ status: "success" });
  } else {
    throw new Error("Unauthorised!");
  }
};
