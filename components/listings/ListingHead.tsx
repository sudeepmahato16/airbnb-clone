"use client";
import React, { useState } from "react";
import Image from "next/image";

import Heading from "@/components/Heading";
import HeartButton from "@/components/HeartButton";
import useCountries from "@/hooks/useCountries";
import { User } from "@prisma/client";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  image: string;
  id: string;
  currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  image,
  id,
  currentUser,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className={`w-full md:h-[420px] sm:h-[280px] bg-gray-100 h-[260px] overflow-hidden  rounded-xl relative transition duration-300`}
      >
        <Image
          src={image}
          fill
          className={`object-cover w-full ${
            imageLoaded ? "opacity-100 " : "opacity-0 "
          }`}
          alt="Image"
          onLoad={() => setImageLoaded(true)}
          sizes=""
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
