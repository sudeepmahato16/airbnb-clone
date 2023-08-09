"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { User, Listing, Reservation } from "@prisma/client";

import Button from "../Button";
import HeartButton from "../HeartButton";

import { formatPrice } from "@/utils/helper";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  actionId = "",
  currentUser,
  actionLabel,
  disabled,
  onAction,
  reservation,
}) => {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const price = reservation ? reservation.totalPrice : data?.price;

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) return;
    onAction?.(actionId);
  }

  return (

    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="aspect-[1/0.95] w-full relative overflow-hidden rounded-xl">
          <div className="w-full h-full bg-gray-100 relative">
            <Image
              fill
              className={`hover:scale-110 transition duration-300 ${isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              src={data.imageSrc}
              alt="Listing"
              onLoad={() => setIsImageLoaded(true)}
              sizes=""
            />
          </div>
          <div className=" absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <span className="font-semibold text-[16px] mt-[4px]">
          {data?.region}, {data?.country}
        </span>
        <span className="font-light text-neutral-500 text-sm">
          {reservationDate || data.category}
        </span>
        <div className="flex flex-row items-baseline gap-1">
          <span className="font-bold text-[#444] text-[14px]">$ {formatPrice(price)}</span>
          {!reservation && <span className="font-light">night</span>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
