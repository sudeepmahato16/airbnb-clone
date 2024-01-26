"use client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface HeartButtonProps {
  listingId: string;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    toast.error("This feature is currently under construction");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
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
    </button>
  );
};

export default HeartButton;
