"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { User, Reservation, Listing } from "@prisma/client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import useConfirmDelete from "@/hooks/useConfirmDelete";
import ConfirmDelete from "@/components/ConfirmDelete";

interface TripsClientProps {
  reservations: (Reservation & {
    listing: Listing;
  })[];
  currentUser?: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
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
        toast.success("Reservation cancelled!");
        router.refresh();
      })
      .catch((error) => toast.error(error?.response?.data?.error))
      .finally(() => {
        setIsCanceling(false);
        onClose();
      });
  };

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />

      <div
        className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4
        "
      >
        {reservations.map((reservation) => (
          <div key={reservation.id}>
            <ListingCard
              data={reservation.listing as Listing}
              reservation={reservation}
              onAction={() => onOpen(reservation.id)}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
            <ConfirmDelete
              id={reservation.id}
              onConfirm={() => onCancel(reservation.id)}
              title="Cancel Reservation"
              desc="Are you sure you want to cancel this reservation?"
              isLoading={isCanceling}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
