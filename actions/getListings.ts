import Listing from "@/models/listing";
import connectToDB from "@/libs/connectToDB";

import { IListing } from "@/types";

const getListings = async (): Promise<IListing[] | undefined> => {
  try {
    await connectToDB();
    const listings = await Listing.find().sort({ createdAt: 1 });

    return JSON.parse(JSON.stringify(listings));
  } catch (error) {
    console.log(error);
  }
};

export default getListings;
