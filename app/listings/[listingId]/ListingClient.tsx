"use client";
import React, { useMemo } from "react";

import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";

import { categories } from "@/constants";
import { IListing, IReservation, IUser } from "@/types";

interface ListingClientProps {
  currentUser?: null | IUser;
  listing: IListing & {
    user: IUser;
  };
  reservations?: IReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  currentUser,
  listing,
  reservations,
}) => {
  const [category] = useMemo(() => {
    return categories.filter((cate) => cate.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            image={listing.image}
            locationValue={listing.locationValue}
            id={listing._id}
            currentUser={currentUser}
          />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6"
        >
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
