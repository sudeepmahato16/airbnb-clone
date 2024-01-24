import React from "react";

import EmptyState from "@/components/EmptyState";
import ListingHead from "./_components/ListingHead";
import ListingInfo from "./_components/ListingInfo";
import ListingClient from "./_components/ListingClient";

import {getCurrentUser} from '@/services/user'
import { getListingById } from "@/services/listing";
import { categories } from "@/utils/constants";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params: { listingId } }: { params: IParams }) => {
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  const {
    title,
    imageSrc,
    country,
    region,
    id,
    user: owner,
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
    <section className="main-container">
      <div  className="flex flex-col gap-6">
        <ListingHead
          title={title}
          image={imageSrc}
          country={country}
          region={region}
          id={id}
        />
      </div>

      <ListingClient
        id={id}
        price={price}
        reservations={reservations}
        user={currentUser}
        title={title}
      >
        <ListingInfo
          user={owner}
          category={category}
          description={description}
          roomCount={roomCount}
          guestCount={guestCount}
          bathroomCount={bathroomCount}
          latlng={latlng}
        />
      </ListingClient>
    </section>
  );
};

export default ListingPage;
