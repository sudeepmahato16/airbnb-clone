import React from "react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { format } from "date-fns";
import { Listing } from "@prisma/client";
import Skeleton from "react-loading-skeleton";

import HeartButton from "./HeartButton";
import Menu from "./Menu";
import Image from "./Image";

import { formatPrice } from "@/utils/helper";

interface ListingCardProps {
  data: Listing;
  reservation?: {
    id: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
  };
  hasFavorited: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  hasFavorited,
}) => {
  const price = reservation ? reservation.totalPrice : data?.price;

  let reservationDate;
  if (reservation) {
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    reservationDate = `${format(start, "PP")} - ${format(end, "PP")}`;
  }

  return (
    <Link href={`/listings/${data.id}`} className="col-span-1 cursor-pointer">
      <div className="flex flex-col gap-1 w-full">
        <div className=" overflow-hidden rounded-xl">
          <div className="aspect-[1/0.95] relative bg-gray-100">
            <div className="absolute top-0 left-0 p-2 flex items-center justify-between w-full">
              <div className="z-5">
                {/* {onAction && actionLabel && (
                  <Menu>
                    <Menu.Toggle
                      id={actionLabel}
                      className="w-10 h-10 flex items-center z-5 justify-center"
                    >
                      <div className="w-7 h-7 rounded-full bg-neutral-700/50 flex items-center justify-center hover:bg-neutral-700/70 group transition duration-200 z-[5]">
                        <BsThreeDots className="h-[18px] w-[18px] text-gray-300 transition duration-100 group-hover:text-gray-100 " />
                      </div>
                    </Menu.Toggle>

                    <Menu.List>
                      <Menu.Button onClick={handleClick}>
                        <MdDeleteOutline />
                        <span>{actionLabel}</span>
                      </Menu.Button>
                    </Menu.List>
                  </Menu>
                )} */}
              </div>

              <div className="w-[40px] h-[40px] flex items-center justify-center">
                <HeartButton listingId={data.id} key={data.id} hasFavorited={hasFavorited} />
              </div>
            </div>
            <Image
              imageSrc={data.imageSrc}
              fill
              alt={data.title}
              effect="zoom"
            />
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
    </Link>
  );
};

export default ListingCard;

export const ListingSkeleton = () => {
  return (
    <div className="col-span-1 ">
      <div className="flex flex-col gap-1 w-full">
        <Skeleton
          width={"100%"}
          height={"100%"}
          borderRadius={"12px"}
          className="aspect-square"
        />

        <div className="flex flex-row gap-3">
          <Skeleton height={"18px"} width={"84px"} />
          <Skeleton height={"18px"} width={"84px"} />
        </div>
        <Skeleton height={"16px"} width={"102px"} />
        <Skeleton height={"18px"} width={"132px"} />
      </div>
    </div>
  );
};
