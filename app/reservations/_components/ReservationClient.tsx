"use client";
import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import { User, Reservation, Listing } from "@prisma/client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import ConfirmDelete from "@/components/ConfirmDelete";
import useConfirmDelete from "@/hooks/useConfirmDelete";

interface ReservationClientProps {
  reservations: (Reservation & {
    listing: Listing;
  })[];
  currentUser?: User | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [isCanceling, setIsCanceling] = useState(false);
  const { onOpen, onClose } = useConfirmDelete();

  const onCancel = (id: string) => {
    setIsCanceling(true);
    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsCanceling(false);
        onClose();
      });
  };

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div
        className=" mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4
        "
      >
        {reservations.map((reservation) => (
          <Fragment key={reservation.id}>
            <ListingCard
              data={reservation.listing as Listing}
              reservation={reservation}
              onAction={() => onOpen(reservation.id)}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
            <ConfirmDelete
              onConfirm={() => onCancel(reservation.id)}
              title="Cancel reservation"
              desc="Are you sure you want to cancel this reservation?"
              isLoading={isCanceling}
              id={reservation.id}
            />
          </Fragment>
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
