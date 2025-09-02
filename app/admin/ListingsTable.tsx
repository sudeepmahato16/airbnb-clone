"use client";
import Table from "@/components/Table";
import { Listing } from "@prisma/client";
import React from "react";
import ListingRow from "./ListingRow";

const ListingsTable = ({ listings }: { listings: Listing[] }) => {
  return (
    <div className="w-full">
      <Table
        columns="240px 1fr 200px 200px 200px"
        className="w-full max-h-[90vh]"
      >
        <Table.Header>
          <span>Listing Name</span>
          <span>Category</span>
          <span>Country</span>
          <span>Price</span>
          <span>Created At</span>
        </Table.Header>
        <Table.Body
          data={listings}
          render={(listing) => (
            <ListingRow
              key={listing.id}
              name={listing.title}
              category={listing.category}
              country={listing.country}
              price={listing.price}
              createdAt={listing.createdAt}
            />
          )}
          emptyMessage="No listings found."
        />
      </Table>
    </div>
  );
};

export default ListingsTable;
