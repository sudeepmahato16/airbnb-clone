import { Types } from "mongoose";
import Listing from "@/models/listing";
import connectToDB from "@/libs/connectToDB";

import { IListing } from "@/types";

export interface IListingParams {
  user?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

const getListings = async (
  params: IListingParams
): Promise<IListing[] | undefined> => {
  try {
    const {
      user,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    const query: any = {};

    if (user) query.user = new Types.ObjectId(user);
    if (category) query.category = category;
    if (roomCount)
      query.roomCount = {
        $gte: +roomCount,
      };

    if (guestCount)
      query.guestCount = {
        $gte: +guestCount,
      };

    if (bathroomCount) {
      query.bathroomCount = {
        $gte: +bathroomCount,
      };
    }

    if (locationValue) query.locationValue = locationValue;

    if (startDate && endDate) {
      query["reservations"] = {
        $not: {
          $elemMatch: {
            $or: [
              {
                endDate: { $gte: startDate },
                startDate: { $lte: startDate },
              },
              {
                startDate: { $lte: endDate },
                endDate: { $gte: endDate },
              },
            ],
          },
        },
      };
    }

    await connectToDB();
   
    const listings = await Listing.aggregate([
      {
        $lookup: {
          from: "reservations",
          localField: "reservations",
          foreignField: "_id",
          as: "reservations",
        },
      },
      {
        $match: query,
      },
      {
        $project: {
          image: 1,
          category: 1,
          locationValue: 1,
          price: 1,
          title: 1,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(listings));
  } catch (error) {
    console.log(error);
  }
};

export default getListings;
