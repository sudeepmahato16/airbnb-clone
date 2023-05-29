import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/user";
import connectToDB from "@/libs/connectToDB";
import { IUser } from "@/types";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

const getCurrentUser = async (): Promise<IUser | null> => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    await connectToDB();
    const currentUser = await User.findOne({
      email: session?.user?.email,
    }).select("-password -__v");

    if (!currentUser) {
      return null;
    }

    return JSON.parse(JSON.stringify(currentUser));
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
