import Listing from "@/models/listing";
import connectToDB from "@/libs/connectToDB";

const getListings = async () => {
  try {
    await connectToDB();
    const listings = await Listing.find().sort({ createdAt: 1 });

    return JSON.parse(JSON.stringify(listings));
  } catch (error) {
    console.log(error);
  }
};

export default getListings;
