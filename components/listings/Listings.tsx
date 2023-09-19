"use client";
import React, { FC } from "react";
import { Listing, User } from "@prisma/client";

import ListingCard from "./ListingCard";
import ListingLoader from "../loader/ListingLoader";

import { useListings } from "@/hooks/useListings";
import { useLoadMore } from "@/hooks/useLoadMore";
import { LISTINGS_BATCH } from "@/constants";

interface ListingsProps {
  currentUser: User | null;
}

const Listings: FC<ListingsProps> = ({ currentUser }) => {
  const { listings, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useListings();
  const { ref } = useLoadMore(
    fetchNextPage,
    hasNextPage,
    status === "loading" || isFetchingNextPage,
    status === "error"
  );

  return (
    <>
      <div className="sm:pt-18 pt-16 grid  grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4">
        {listings?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group?.items?.map((listing: Listing) => (
              <ListingCard
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
            ))}
          </React.Fragment>
        ))}
        {(status === "loading" || isFetchingNextPage) && (
          <>
            {Array.from({ length: LISTINGS_BATCH }).map(
              (_item: any, i: number) => (
                <ListingLoader key={i} />
              )
            )}
          </>
        )}
      </div>
      <div ref={ref} />
    </>
  );
};

export default Listings;
