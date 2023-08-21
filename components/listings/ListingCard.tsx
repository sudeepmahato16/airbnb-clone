"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { format } from "date-fns";
import { User, Listing, Reservation } from "@prisma/client";

import HeartButton from "../HeartButton";
import Menu from "./../Menu";

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
    e?.stopPropagation();
    if (disabled) return;
    onAction?.(actionId);
  };

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="aspect-[1/0.95] w-full relative overflow-hidden rounded-xl">
          <div className="w-full h-full bg-gray-100 relative">
            <div className=" absolute top-3 left-3 z-20">
              {onAction && actionLabel && (
                <Menu>
                  <Menu.Toggle
                    id={actionLabel}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <div className="w-6 h-6 rounded-full bg-neutral-700/50 flex items-center justify-center hover:bg-neutral-700/70 group transition duration-100 z-[20]">
                      <BsThreeDots className="h-[18px] w-[18px] text-gray-300 transition duration-100 group-hover:text-gray-100 " />
                    </div>
                  </Menu.Toggle>

                  <Menu.List>
                    <Menu.Button onClick={handleCancel} icon={MdDeleteOutline}>
                      {actionLabel}
                    </Menu.Button>
                  </Menu.List>
                </Menu>
              )}
            </div>
            <Image
              fill
              className={`transition duration-300 ${
                isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
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
          <span className="font-bold text-[#444] text-[14px]">
            $ {formatPrice(price)}
          </span>
          {!reservation && <span className="font-light">night</span>}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
