import React from "react";

import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getListings, { IListingParams } from "@/actions/getListings";
import getCurrentUser from "@/actions/getCurrentUser";
import ListingCard from "@/components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingParams;
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
        {listings.map((listing: any) => (
          <ListingCard
            key={listing._id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
