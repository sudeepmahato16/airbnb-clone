"use client";
import React from "react";
import dynamic from "next/dynamic";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import useCountries from "@/hooks/useCountries";
import { Category, IUser } from "@/types";

interface ListingInfoProps {
  user: IUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: Category | undefined;
  locationValue: string;
}

const Map = dynamic(() => import("./../Map"), {
  ssr: false,
});

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-[16px] font-semibold flex flex-row items-center gap-2">
          <span className="mr-1">Hosted by</span> <Avatar src={user?.image} />
          <span> {user?.name}</span>
        </div>
        <div
          className="flex flex-row items-center gap-4 font-light text-neutral-700
          "
        >
          <span>{guestCount} guests</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description || ""}
        />
      )}
      <hr />
      <p className=" font-light text-neutral-500 text-[16px] ">{description}</p>
      <hr />
      <Map center={coordinates}/>
    </div>
  );
};

export default ListingInfo;
