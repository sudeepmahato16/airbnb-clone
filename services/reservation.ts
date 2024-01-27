"use server";
import { revalidatePath } from "next/cache";
import { Listing, Reservation } from "@prisma/client";

import { db } from "@/lib/db";
import { LISTINGS_BATCH } from "@/utils/constants";
import { getCurrentUser } from "./user";

export const getReservations = async (args: Record<string, string>) => {
  try {
    const { listingId, userId, authorId, cursor } = args;

    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (listingId) {
      where.listingId = listingId;
    }

    if (authorId) {
      where.listing = { userId: authorId };
    }

    const filterQuery: any = {
      where,
      take: LISTINGS_BATCH,
      include: {
        listing: true,
      },
      orderBy: { createdAt: "desc" },
    };

    if (cursor) {
      filterQuery.cursor = { id: cursor };
      filterQuery.skip = 1;
    }

    const reservations = (await db.reservation.findMany({
      ...filterQuery,
    })) as (Reservation & { listing: Listing })[];

    const nextCursor =
      reservations.length === LISTINGS_BATCH
        ? reservations[LISTINGS_BATCH - 1].id
        : null;

    const listings = reservations.map((reservation) => {
      const { id, startDate, endDate, totalPrice, listing } = reservation;

      return {
        ...listing,
        reservation: { id, startDate, endDate, totalPrice },
      };
    });

    return {
      listings,
      nextCursor,
    };
  } catch (error: any) {
    console.log(error?.message);
    return {
      listings: [],
      nextCursor: null,
    };
  }
};

export const createReservation = async ({
  listingId,
  startDate,
  endDate,
  totalPrice,
}: {
  listingId: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  totalPrice: number;
}) => {
  try {
    if (!listingId || !startDate || !endDate || !totalPrice)
      throw new Error("Invalid data");

    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Please log in to reserve!");
    }

    await db.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: user.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    revalidatePath(`/listings/${listingId}`);
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
