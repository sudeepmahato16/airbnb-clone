"use server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const registerUser = async ({
  name,
  email,
  password: inputPassword,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    if (!name || !email || !inputPassword)
      throw new Error("Please provide all credentials");
    const hashedPassword = await bcrypt.hash(inputPassword, 12);

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
