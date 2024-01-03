import { NextResponse } from "next/server";
import { db } from "@/libs/db";


export const GET = async () => {
  const countries = await db.country.findMany();

  return NextResponse.json(countries);
};
