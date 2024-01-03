import { db } from "@/libs/db";
import { Listing, User } from "@prisma/client";

interface IParams {
  listingId?: string;
}

export const getListingById = async (
  params: IParams
): Promise<
  | (Listing & {
      user: User;
      reservations?: { startDate: Date; endDate: Date }[];
    })
  | null
> => {
  try {
    const { listingId } = params;

    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
        reservations: {
          select: {
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    if (!listing) {
      return null;
    }

    return JSON.parse(JSON.stringify(listing));
  } catch (error: any) {
    throw new Error(error);
  }
};
