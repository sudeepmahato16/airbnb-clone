import React from 'react'
import Skeleton from 'react-loading-skeleton';

const ListingLoader = () => {
  return (
    <div className="col-span-1 ">
    <div className="flex flex-col gap-1 w-full">
      <Skeleton
        width={"100%"}
        height={"100%"}
        borderRadius={"12px"}
        className="aspect-square"
      />

      <div className="flex flex-row gap-3">
        <Skeleton height={"18px"} width={"84px"} />
        <Skeleton height={"18px"} width={"84px"} />
      </div>
      <Skeleton height={"16px"} width={"102px"} />
      <Skeleton height={"18px"} width={"132px"} />
    </div>
  </div>
  )
}

export default ListingLoader