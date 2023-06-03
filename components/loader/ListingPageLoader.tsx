"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";

import Container from "../Container";
import "react-loading-skeleton/dist/skeleton.css";

const ListingPageLoader = () => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <div className="text-start">
            <Skeleton width={"124px"} height={"22px"} className="mb-2" />
            <Skeleton width={"148px"} height={"18px"} />
          </div>

          <Skeleton width={"100%"} height={"420px"} borderRadius={"12px"} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <Skeleton width={"74px"} height={"18px"} />
                <Skeleton width={"28px"} height={"28px"} circle />
                <Skeleton width={"84px"} height={"18px"} />
              </div>

              <div className="flex flex-row items-center gap-4">
                <Skeleton width={"64px"} height={"16px"} />
                <Skeleton width={"64px"} height={"16px"} />
                <Skeleton width={"64px"} height={"16px"} />
              </div>
            </div>
          </div>

          <div className="order-first mb-10 md:order-last md:col-span-3">
            <Skeleton width={"100%"} className="md:!h-[56px] !h-[360px]" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingPageLoader;
