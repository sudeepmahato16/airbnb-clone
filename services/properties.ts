"use server";
import { db } from "@/lib/db";
import { LISTINGS_BATCH } from "@/utils/constants";

export const getProperties = async (args?: Record<string, string>) => {
  try {
    const { userId, cursor } = args || {};

    if (!userId) {
      throw new Error("Unauthorized");
    }
    const filterQuery: any = {
      where: {
        userId,
      },
      take: LISTINGS_BATCH,
      orderBy: { createdAt: "desc" },
    };

    if (cursor) {
      filterQuery.cursor = { id: cursor };
      filterQuery.skip = 1;
    }

    const properties = await db.listing.findMany({
      ...filterQuery,
    });

    const nextCursor =
      properties.length === LISTINGS_BATCH
        ? properties[LISTINGS_BATCH - 1].id
        : null;

    return {
      listings: properties,
      nextCursor,
    };
  } catch (error: any) {
    return {
      listings: [],
      nextCursor: null,
    };
  }
};
