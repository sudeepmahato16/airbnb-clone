import connectToDB from "@/libs/connectToDB";
import Reservation from "@/models/reservation";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

const getReservations = async (params: IParams) => {
  try {
    const { listingId, userId, authorId } = params;
    const query: any = {};
    if (listingId) query.listing = listingId;
    if (userId) query.user = userId;
    if (authorId) query.listing.user = authorId;

    await connectToDB();
    const reservations = await Reservation.find(query)
      .populate("listing")
      .sort({ createdAt: "desc" });

    return JSON.parse(JSON.stringify(reservations));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getReservations;
