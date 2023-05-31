import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import Reservation from "@/models/reservation";

interface IParams {
  reservationId?: string;
}

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string")
    throw new Error("Invalid ID");

  const reservation = await Reservation.deleteMany({
    $and: [
      { _id: reservationId },
      { $or: [{ user: currentUser._id }, { "listing.user": currentUser._id }] },
    ],
  }).populate("listing");

  return NextResponse.json(reservation);
};
