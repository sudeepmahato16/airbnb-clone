import { NextResponse } from "next/server";
import Listing from "@/models/listing";
import getCurrentUser from "@/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  
  const body = await req.json();

  const {
    category,
    location,
    guestCount,
    bathroomCount,
    roomCount,
    image,
    price,
    title,
    description,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.error();
    }
  });

  const listing = await Listing.create({
    category,
    locationValue: location.value,
    guestCount,
    bathroomCount,
    roomCount,
    image,
    price: parseInt(price),
    title,
    description,
    user: currentUser._id,
  });

  return NextResponse.json(listing);
};
