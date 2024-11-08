"use server";
import { revalidatePath } from "next/cache";
import { Listing, Reservation } from "@prisma/client";

import { db } from "@/lib/db";
import { LISTINGS_BATCH } from "@/utils/constants";
import { getCurrentUser } from "./user";
import { stripe } from "@/lib/stripe";

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
  userId
}: {
  listingId: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  totalPrice: number;
  userId: string
}) => {
  try {
    if (!listingId || !startDate || !endDate || !totalPrice)
      throw new Error("Invalid data");

    await db.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId,
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

export const deleteReservation = async (reservationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Unauthorized");
    }

    if (!reservationId || typeof reservationId !== "string") {
      throw new Error("Invalid ID");
    }


    const reservation = await db.reservation.findUnique({
      where: {
        id: reservationId,
      }
    });

    if (!reservation) {
      throw new Error("Reservation not found!");
    }

    await db.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    revalidatePath("/reservations");
    revalidatePath(`/listings/${reservation.listingId}`);
    revalidatePath("/trips");

    return reservation;
  } catch (error: any) {
    throw new Error(error.message)
  }
};


export const createPaymentSession = async ({
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
  if (!listingId || !startDate || !endDate || !totalPrice)
    throw new Error("Invalid data");

  const listing = await db.listing.findUnique({
    where: {id: listingId}
  })

  if(!listing) throw new Error("Listing not found!");

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Please log in to reserve!");
  }

  const product = await stripe.products.create({
    name: "Listing",
    images: [listing.imageSrc],
    default_price_data: {
      currency: "USD",
      unit_amount: totalPrice * 100
    }
  })

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/trips`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/listings/${listing.id}`,
    payment_method_types: ['card'],
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ["DE", "US", "NP", "CH", "BH", "AU"],
    },
    metadata: {
      listingId,
      startDate: String(startDate),
      endDate: String(endDate),
      totalPrice,
      userId: user.id
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return {url: stripeSession.url}
}