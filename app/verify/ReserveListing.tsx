import { db } from "@/lib/db";
import { createReservation } from "@/services/reservation";
import { getCurrentUser } from "@/services/user";

import React, { FC, Suspense } from "react";
import { TbLoader2 } from "react-icons/tb";
import RedirectUser from "./RedirectUser";

interface IReserveListingProps {
  listingId: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
}

function getNumberOfDays(
  startDateStr: string,
  endDateStr: string,
  inclusive: boolean = false
): number {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const diffInMs = endDate.getTime() - startDate.getTime();
  let diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (inclusive) {
    diffInDays += 1;
  }

  return diffInDays;
}

const ReserveListing: FC<IReserveListingProps> = async ({
  listingId,
  totalAmount,
  startDate,
  endDate,
}) => {
  console.log("data", listingId, startDate, endDate, totalAmount);

  const user = await getCurrentUser();

  if (!user) return <div>Unauthorized</div>;

  const listing = await db.listing.findUnique({
    where: {
      id: listingId,
    },
  });

  if (!listing) return <div>Something went wrong</div>;

  const numberOfDays = getNumberOfDays(startDate, endDate, true);

  if (totalAmount !== numberOfDays * listing.price)
    return <div>Something went wrong</div>;

  try {
    const reservation = await createReservation({
      listingId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice: totalAmount,
      userId: user.id,
    });

    await fetch("http://localhost:3000/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guestName: user.name,
        hotelName: listing.title,
        reservationId: reservation.id,
        checkInDate: new Date(startDate).toISOString().split("T")[0],
        checkOutDate: new Date(endDate).toISOString().split("T")[0],
        totalPrice: totalAmount,
        hotelAddress: listing.country,
        sendTo: user.email,
      }),
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-[50%] flex items-center justify-center mt-20">
          <div className="flex flex-col items-center gap-2">
            <TbLoader2 className="h-8 w-8 animate-spin text-zinc-500" />
            <h3 className="font-semibold text-xl">You&#39;re all booked!</h3>
            <p>Your reservation was successful. Redirecting you now...</p>
          </div>
        </div>
      }
    >
      <RedirectUser />
    </Suspense>
  );
};

export default ReserveListing;
