import React from "react";


import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";

import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return <ListingClient listing={listing} currentUser={currentUser} />;
};

export default ListingPage;
