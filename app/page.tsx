import React from "react";

import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";

import { getListings, IListingsParams } from "@/actions/getListings";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Listing } from "@prisma/client";

export const dynamic = 'force-dynamic'

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (!listings || listings.length === 0) {
    return <EmptyState />;
  }

  return (
    <Container>
      <div className="sm:pt-20 pt-16 grid  grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4">
        {listings.map((listing: Listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
