"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";

import Container from "../Container";
import ListingLoader from "./ListingLoader";

import "react-loading-skeleton/dist/skeleton.css";

const PageLoader = () => {
  return (
    <Container>
      <div className="text-start">
        <Skeleton width={"124px"} height={"22px"} className="mb-2" />
        <Skeleton width={"148px"} height={"18px"} />
      </div>

      <div className=" mt-10 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {Array.from({ length: 10 }).map((_item, i: number) => (
          <ListingLoader key={i} />
        ))}
      </div>
    </Container>
  );
};

export default PageLoader;
