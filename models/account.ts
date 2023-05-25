import { Schema, Types, model } from "mongoose";

const AccountSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  type: String,
  provider: String,
  providerAccountId: String,
  expires_at: Date,
  scope: String,
  session_state: String,
  refresh_token: String,
  access_token: String,
  token_type: String,
  id_token: String 
});

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = model("Account", AccountSchema);
export default Account;
