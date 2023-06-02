import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import User from "@/models/user";

interface IParams {
  listingId?: string;
}

export const POST = async (_req: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid id");
  }

  const user = await User.findByIdAndUpdate(currentUser._id, {
    $push: {
      favorites: listingId,
    },
  });

  return NextResponse.json(user);
};

export const DELETE = async (
  _req: Request,
  { params }: { params: IParams }
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid id");
  }

  const user = await User.findByIdAndUpdate(currentUser._id, {
    $pull: {
      favorites: listingId,
    },
  });

  return NextResponse.json(user);
};
