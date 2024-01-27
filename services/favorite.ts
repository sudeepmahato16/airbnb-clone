"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "./user";
import { revalidatePath } from "next/cache";

export const getFavorites = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) return [];
    const data = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        favoriteIds: true,
      },
    });

    return data?.favoriteIds ?? [];
  } catch (error) {
    return [];
  }
};

export const updateFavorite = async ({
  listingId,
  favorite,
}: {
  listingId: string;
  favorite: boolean;
}) => {
  try {
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid ID");
    }

    const favorites = await getFavorites();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Please sign in to favorite the listing!");
    }

    let newFavorites;
    let hasFavorited;

    if (!favorite) {
      newFavorites = favorites.filter((id) => id !== listingId);
      hasFavorited = false;
    } else {
      if (favorites.includes(listingId)) {
        newFavorites = [...favorites];
      } else {
        newFavorites = [listingId, ...favorites];
      }
      hasFavorited = true;
    }

    await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: newFavorites,
      },
    });

    revalidatePath("/");
    revalidatePath(`/listings/${listingId}`);
    revalidatePath("/favorites");

    return {
      hasFavorited,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getFavoriteListings = async () => {
  try {
    const favoriteIds = await getFavorites();
    const favorites = await db.listing.findMany({
      where: {
        id: {
          in: [...(favoriteIds || [])],
        },
      },
    });

    return favorites;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
