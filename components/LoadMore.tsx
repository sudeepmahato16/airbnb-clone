"use client";
import React, { FC } from "react";
import { Listing } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

import ListingCard, { ListingSkeleton } from "./ListingCard";
import { useLoadMore } from "@/hooks/useLoadMore";

interface LoadMoreProps {
  nextCursor: string;
  fnArgs?: { [key: string]: string | undefined };
  queryFn: (args: Record<string, string>) => Promise<{
    listings: Listing[];
    nextCursor: null | string;
  }>;
  queryKey: any[];
  favorites: string[];
}

const LoadMore: FC<LoadMoreProps> = ({
  nextCursor,
  fnArgs,
  queryFn,
  queryKey,
  favorites,
}) => {
  const { data, isFetchingNextPage, hasNextPage, status, fetchNextPage } =
    useInfiniteQuery({
      queryFn: ({ pageParam = nextCursor }) =>
        queryFn({ ...fnArgs, cursor: pageParam }),
      queryKey,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    });

  const { ref } = useLoadMore(
    fetchNextPage,
    hasNextPage,
    status === "loading" || isFetchingNextPage,
    status === "error"
  );

  return (
    <>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group?.listings?.map(
            (
              listing: Listing & {
                reservation?: {
                  id: string;
                  startDate: Date;
                  endDate: Date;
                  totalPrice: number;
                };
              }
            ) => {
              const hasFavorited = favorites.includes(listing.id);
              return (
                <ListingCard
                  key={listing?.reservation?.id || listing.id}
                  data={listing}
                  hasFavorited={hasFavorited}
                  reservation={listing?.reservation}
                />
              );
            }
          )}
        </React.Fragment>
      ))}
      {(status === "loading" || isFetchingNextPage) && (
        <>
          {Array.from({ length: 4 }).map(
            (_item: any, i: number) => (
              <ListingSkeleton key={i} />
            )
          )}
        </>
      )}
      {status === "error" && (
        <p className="text-xl mt-8 text-center font-semibold">
          Something went wrong!
        </p>
      )}
      <div ref={ref} />
    </>
  );
};

export default LoadMore;
