import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { getListings } from "@/actions/getListings";

export const useListings = () => {
  const params = useSearchParams();
  const query = queryString.parse(params.toString());

  const {
    data: listings,
    isFetchingNextPage,
    hasNextPage,
    status,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = undefined }) =>
      getListings({ ...query, cursor: pageParam }),
    queryKey: ["listings", query],
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
  });

  return {
    listings,
    isFetchingNextPage,
    hasNextPage,
    status,
    fetchNextPage,
    error,
  };
};
