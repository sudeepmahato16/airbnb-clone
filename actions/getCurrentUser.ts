import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { User } from "@prisma/client";
import { db } from "@/libs/db";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      }
    });

    if (!currentUser) {
      return null;
    }

    return JSON.parse(JSON.stringify(currentUser));
  } catch (error) {
    return null;
  }
};

