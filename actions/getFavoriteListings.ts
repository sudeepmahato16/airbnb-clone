import {getCurrentUser} from "./getCurrentUser";
import { db } from "@/libs/db";

export const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await db.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    });

    return JSON.parse(JSON.stringify(favorites));
  } catch (error: any) {
    throw new Error(error);
  }
};
