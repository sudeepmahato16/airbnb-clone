import { Schema, Types, model } from "mongoose";

const AccountSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  type: String,
  provider: String,
  providerAccountId: String,
  expiresAt: Date,
  scope: String,
  sessionState: String,
  refreshToken: String,
  accessToken: String,
  tokenType: String,
});

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = model("Account", AccountSchema);
export default Account;
