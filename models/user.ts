import { Schema, Types, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    image: String,
    password: String,
    favourite: [String],
    accounts: [
      {
        type: Types.ObjectId,
        ref: "Account",
      },
    ],
    listings: [
      {
        type: Types.ObjectId,
        ref: "Listings",
      },
    ],
    reservations: [
      {
        type: Types.ObjectId,
        ref: "reservations",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);
export default User;
