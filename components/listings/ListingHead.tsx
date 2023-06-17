"use client";
import React from "react";
import Image from "next/image";

import Heading from "@/components/Heading";
import HeartButton from "@/components/HeartButton";
import useCountries from "@/hooks/useCountries";
import { IUser } from "@/types";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  image: string;
  id: string;
  currentUser?: IUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  image,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full md:h-[420px] sm:h-[280px]  h-[260px] overflow-hidden  rounded-xl relative">
        <Image src={image} fill className="object-cover w-full" alt="Image" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
