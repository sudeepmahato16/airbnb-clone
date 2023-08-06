import bcrypt from "bcrypt";
import { db } from "@/libs/db";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      }
    });
    
    return new Response(JSON.stringify(user), {
      status: 200,
    });
    
  } catch (error) {
    return new Response("Failed to create an account!", { status: 404 });
  }
};
