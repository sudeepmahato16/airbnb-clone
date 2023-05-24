import { Schema, Types, model } from "mongoose";

const ListingSchema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: String,
    category: String,
    roomcount: Number,
    bathroomCount: Number,
    guestCount: Number,
    locationValue: String,
    price: Number,
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    reservations: [
      {
        type: Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Listing = model("Listing", ListingSchema);
export default Listing;
