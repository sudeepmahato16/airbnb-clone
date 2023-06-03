"use client";
import React from "react";

import Container from "../Container";
import ListingLoader from "./ListingLoader";

const HomePageLoader = () => {
  return (
    <Container>
      <div className=" pt-24 grid  grid-cols-1  sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {Array.from({ length: 10 }).map((_item, i: number) => (
          <ListingLoader key={i} />
        ))}
      </div>
    </Container>
  );
};

export default HomePageLoader;
