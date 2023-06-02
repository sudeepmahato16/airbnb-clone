import Listing from "@/models/listing";
import getCurrentUser from "./getCurrentUser";

const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const favorites = await Listing.find({
      _id: {
        $in: [...currentUser.favorites],
      },
    });

    return JSON.parse(JSON.stringify(favorites));
    
  } catch (error) {
    console.log(error);
  }
};

export default getFavoriteListings;
