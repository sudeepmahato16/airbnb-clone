import connectToDB from "@/libs/connectToDB";
import Listing from "@/models/listing";

interface IParams{
    listingId?: string
}

const getListingById = async (params: IParams) => {
    try{
        const {listingId} = params;
        await connectToDB();
        const listing = await Listing.findById(listingId).populate("user");

        if(!listing) return null;

        return JSON.parse(JSON.stringify(listing))

    }catch(error){

    }
}

export default getListingById;