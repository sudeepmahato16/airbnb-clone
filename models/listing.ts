import { Schema, Types, model, models } from "mongoose";

const ListingSchema = new Schema(
  {
    title: String,
    description: String,
    image: String,
    category: String,
    roomCount: Number,
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

const Listing = models.Listing || model("Listing", ListingSchema);
export default Listing;
