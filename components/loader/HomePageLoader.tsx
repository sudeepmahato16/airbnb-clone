"use client";
import React from "react";

import Container from "../Container";
import ListingLoader from "./ListingLoader";

const HomePageLoader = () => {
  return (
    <Container>
      <div className=" md:pt-24 sm:pt-20 pt-16 grid  grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4">
        {Array.from({ length: 10 }).map((_item, i: number) => (
          <ListingLoader key={i} />
        ))}
      </div>
    </Container>
  );
};

export default HomePageLoader;
