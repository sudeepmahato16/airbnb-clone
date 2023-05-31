"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { IListing, IReservation, IUser } from "@/types";

interface TripsClientProps {
  reservations: IReservation[];
  currentUser?: IUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservation/${id}`)
        .then(() => {
          toast.success("Reservation cancelled!");
          router.refresh();
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />

      <div
        className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8
        "
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation._id}
            data={reservation.listing as IListing}
            reservation={reservation}
            actionId={reservation._id}
            onAction={onCancel}
            disabled={deletingId === reservation._id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
