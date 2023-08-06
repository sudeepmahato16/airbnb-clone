import { db } from "@/libs/db";

interface IParams {
  listingId?: string;
}

export const getListingById = async (params: IParams) => {
  try {
    const { listingId } = params;

    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
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
