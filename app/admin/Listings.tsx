import { db } from "@/lib/db";
import React from "react";
import ListingsTable from "./ListingsTable";

const Listings = async () => {
  const listings = await db.listing.findMany();

  return <ListingsTable listings={listings} />;
};

export default Listings;
