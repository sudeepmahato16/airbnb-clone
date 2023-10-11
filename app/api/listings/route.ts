import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { db } from "@/libs/db";
import { LISTINGS_BATCH } from "@/constants";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await req.json();

  const {
    category,
    location: { region, label: country, latlng },
    guestCount,
    bathroomCount,
    roomCount,
    image: imageSrc,
    price,
    title,
    description,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      return NextResponse.error();
    }
  });

  const listing = await db.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      country,
      region,
      latlng,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const { query } = parse(req.url, true);

    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      country,
      startDate,
      endDate,
      category,
      cursor,
    } = query;

    let where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (category) {
      where.category = category;
    }

    if (roomCount) {
      where.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      where.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      where.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (country) {
      where.country = country;
    }

    if (startDate && endDate) {
      where.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const queryFilter: any = {
      where,
      take: LISTINGS_BATCH,
      orderBy: { createdAt: "desc" }

    };

    if(cursor){
      queryFilter.cursor = {id: cursor},
      queryFilter.skip = 1
    }

    const listings = await db.listing.findMany(queryFilter);

    const nextCursor =
      listings.length === LISTINGS_BATCH ? listings[LISTINGS_BATCH - 1].id : null;

    return NextResponse.json({
      items: listings,
      nextCursor,
    });
    
  } catch (error: any) {
    console.log(error)
    return new Response("Server error", { status: 500 });
  }
};
