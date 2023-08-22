"use client"
import { useState } from "react";
import Image from "next/image";

const CustomImage = ({
  imageSrc,
  title,
  fill = false,
}: {
  imageSrc: string;
  title: string;
  fill?: boolean;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Image
      fill={fill}
      className={`transition duration-300 ${
        isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      src={imageSrc}
      alt={title}
      onLoad={() => setIsImageLoaded(true)}
      sizes=""
    />
  );
};

export default CustomImage;
