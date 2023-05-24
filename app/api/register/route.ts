import bcrypt from "bcrypt";

import User from "@/models/user";
import connectToDB from "@/libs/connectToDB";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);
    await connectToDB();

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ ...user, password: undefined }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to create an account!", { status: 404 });
  }
};
