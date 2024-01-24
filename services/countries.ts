"use server";

import { db } from "@/lib/db";

export const getAllCountries = async () => {
  try {
    const countries = await db.country.findMany();

    return countries;
  } catch (error) {
    return [];
  }
};
