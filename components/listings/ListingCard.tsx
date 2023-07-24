"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";

import Button from "../Button";
import HeartButton from "../HeartButton";

import useCountries from "@/hooks/useCountries";
import { formatPrice } from "@/utils/helper";
import { IListing, IReservation, IUser } from "@/types";

interface ListingCardProps {
  data: IListing;
  reservation?: IReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: IUser | null;
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
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;
      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data?.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data._id}`)}
      className="col-span-1 cursor-pointer"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <div className="w-full h-full bg-gray-100">
          <Image
            fill
            className={`object-cover h-full w-full hover:scale-110 transition duration-300 ${
              isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            src={data.image}
            alt="Listing"
            onLoad={() => setIsImageLoaded(true)}
            sizes=""
            />
            </div>
          <div className=" absolute top-3 right-3">
            <HeartButton listingId={data._id} currentUser={currentUser} />
          </div>
        </div>
        <span className="font-semibold text-[16px] mt-[2px]">
          {location?.region}, {location?.label}
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
