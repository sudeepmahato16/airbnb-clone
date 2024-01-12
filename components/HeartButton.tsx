"use client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { User } from "@prisma/client";

interface HeartButtonProps {
  listingId: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId }) => {
  return (
    <div
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
        z-[5]
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          text-gray-50
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart size={24} className={"fill-neutral-500/70"} />
    </div>
  );
};

export default HeartButton;
