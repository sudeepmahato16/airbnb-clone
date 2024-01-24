"use client";
import React, { FC } from "react";
import { Listing } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

import ListingCard, { ListingSkeleton } from "./ListingCard";
import { LISTINGS_BATCH } from "@/utils/constants";
import { useLoadMore } from "@/hooks/useLoadMore";

interface LoadMoreProps {
  nextCursor: string;
  fnArgs?: { [key: string]: string | undefined };
  queryFn: (args: Record<string, string>) => Promise<{
    listings: Listing[];
    nextCursor: null | string;
  }>;
  queryKey: any[];
}

const LoadMore: FC<LoadMoreProps> = ({
  nextCursor,
  fnArgs,
  queryFn,
  queryKey,
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
          {group?.listings?.map((listing: Listing) => (
            <ListingCard key={listing.id} data={listing} />
          ))}
        </React.Fragment>
      ))}
      {(status === "loading" || isFetchingNextPage) && (
        <>
          {Array.from({ length: LISTINGS_BATCH / 2 }).map(
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
