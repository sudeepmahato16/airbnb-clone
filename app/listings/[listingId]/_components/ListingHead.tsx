import React from "react";
import Image from "@/components/Image";


import Heading from "@/components/Heading";
import HeartButton from "@/components/HeartButton";

interface ListingHeadProps {
  title: string;
  country: string | null,
  region: string | null
  image: string;
  id: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  country = '',
  region = '',
  image,
  id,
}) => {


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
          imageSrc={image}
          fill
          className={`object-cover`}
          alt={title}
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;