"use client"
import React, { useLayoutEffect } from "react";
import Skeleton from "react-loading-skeleton";

const Loading = () => {
  useLayoutEffect(() => {
    if(typeof window === undefined) return;
    window.scrollTo(0,0);
  }, [])

  return (
    <div className="main-container">
      <div className="flex flex-col gap-6">
        <div className="text-start">
          <Skeleton width={"124px"} height={"22px"} className="mb-2" />
          <Skeleton width={"148px"} height={"18px"} />
        </div>

        <Skeleton
          className="!w-full md:!h-[420px] sm:!h-[280px]  !h-[260px]"
          borderRadius={"12px"}
        />
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
  );
};

export default Loading;
