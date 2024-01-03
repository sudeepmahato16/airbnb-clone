import React from "react";

import EmptyState from "@/components/EmptyState";
import ListingClient from "./_components/ListingClient";
import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { getListingById } from "@/actions/getListingById";
import { categories } from "@/utils/constants";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  const {
    title,
    imageSrc,
    country,
    region,
    id,
    user,
    price,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    latlng,
    reservations,
  } = listing;

  const category = categories.find((cate) => cate.label === listing.category);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={title}
            image={imageSrc}
            country={country}
            region={region}
            id={id}
            currentUser={currentUser}
          />
        </div>

        <ListingClient
          id={id}
          price={price}
          currentUser={currentUser}
          reservations={reservations}
        >
          <ListingInfo
            user={user}
            category={category}
            description={description}
            roomCount={roomCount}
            guestCount={guestCount}
            bathroomCount={bathroomCount}
            latlng={latlng}
          />
        </ListingClient>
      </div>
    </Container>
  );
};

export default ListingPage;
