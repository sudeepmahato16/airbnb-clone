"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";

import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingReservation from "@/components/listings/ListingReservation";
import ListingInfo from "@/components/listings/ListingInfo";

import useLoginModal from "@/hooks/useLoginModal";
import { categories } from "@/constants";
import { IListing, IReservation, IUser } from "@/types";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  currentUser?: null | IUser;
  listing: IListing & {
    user: IUser;
  };
  reservations?: IReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  currentUser,
  listing,
  reservations = [],
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const loginModal = useLoginModal();
  const router = useRouter();

  const category = useMemo(() => {
    return categories.find((cate) => cate.label === listing.category);
  }, [listing.category]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listing: listing?._id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing?._id,
    loginModal,
    router,
    totalPrice,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            image={listing.image}
            locationValue={listing.locationValue}
            id={listing._id}
            currentUser={currentUser}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />

          <div
            className="order-first mb-10 md:order-last md:col-span-3"
          >
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
