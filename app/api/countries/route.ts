import { NextResponse } from "next/server";
import countries from "world-countries";
import { db } from "@/libs/db";

export const POST = async () => {
  const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    region: country.region,
    latlng: country.latlng,
  }));

  await db.country.createMany({
    data: formattedCountries,
  });

  return new NextResponse("success", { status: 200 });
};

export const GET = async () => {
  const countries = await db.country.findMany();

  return NextResponse.json(countries);
};
