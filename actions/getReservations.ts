import { Types } from "mongoose";
import connectToDB from "@/libs/connectToDB";
import Reservation from "@/models/reservation";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

const getReservations = async (params: IParams) => {
  const { listingId, userId, authorId } = params;
  const query: any = {};
  if (listingId) query["listing._id"] = new Types.ObjectId(listingId);
  if (userId) query.user = new Types.ObjectId(userId);
  if (authorId) query["listing.user"] = new Types.ObjectId(authorId);

  await connectToDB();

  const reservations = await Reservation.aggregate([
    {
      $lookup: {
        from: "listings",
        foreignField: "_id",
        localField: "listing",
        as: "listing",
      },
    },
    {
      $unwind: "$listing",
    },
    {
      $match: query,
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return JSON.parse(JSON.stringify(reservations));
};

export default getReservations;
