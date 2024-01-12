"use client";
import React, { FC, useEffect, useState } from "react";
import { Listing } from "@prisma/client";
import { useInView } from "react-intersection-observer";

import ListingCard, { ListingSkeleton } from "./ListingCard";
import { getListings } from "@/services/listing";
import { LISTINGS_BATCH } from "@/utils/constants";

interface LoadMoreProps {
  nextCursor: string | null;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const LoadMore: FC<LoadMoreProps> = ({
  nextCursor: initialNextCursor,
  searchParams,
}) => {
  const { ref, inView } = useInView();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);

  useEffect(() => {
    setNextCursor(initialNextCursor);
    setListings([]);
  }, [initialNextCursor]);

  useEffect(() => {
    if (inView && !isLoading && nextCursor) {
      setIsLoading(true);

      getListings({ ...searchParams, cursor: nextCursor }).then(
        (newListings) => {
          setListings((prev) => [...prev, ...newListings.listings]);
          setNextCursor(newListings.nextCursor);
          setIsLoading(false);
        }
      );
    }
  }, [inView, isLoading, nextCursor, searchParams]);

  return (
    <>
      {listings.map((listing) => {
        return <ListingCard key={listing.id} data={listing} />;
      })}

      {isLoading ? (
        <>
          {Array.from({ length: LISTINGS_BATCH / 2 }).map(
            (_item, i: number) => (
              <ListingSkeleton key={i} />
            )
          )}
        </>
      ) : (
        <div ref={ref} />
      )}
    </>
  );
};

export default LoadMore;
