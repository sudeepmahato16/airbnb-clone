"use client";
import React, { useState } from "react";
import Image from "next/image";

import Heading from "@/components/Heading";
import HeartButton from "@/components/HeartButton";
import { User } from "@prisma/client";

interface ListingHeadProps {
  title: string;
  country: string | null,
  region: string | null
  image: string;
  id: string;
  currentUser?: User | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  country = '',
  region = '',
  image,
  id,
  currentUser,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${region}, ${country}`}
      />
      <div
        className={`w-full md:h-[420px] sm:h-[280px] bg-gray-100 h-[260px] overflow-hidden  rounded-xl relative transition duration-300`}
      >
        <Image
          src={image}
          fill
          className={`object-cover w-full ${imageLoaded ? "opacity-100 " : "opacity-0 "
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
