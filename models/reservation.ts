import { Schema, Types, model, models } from "mongoose";

const ReservationSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    listing: {
      type: Types.ObjectId,
      ref: "Listing",
    },
    startDate: Date,
    endDate: Date,
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
);

const Reservation =
  models.Reservation || model("Reservation", ReservationSchema);
export default Reservation;
