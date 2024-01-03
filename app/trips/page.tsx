import React from "react";

import TripsClient from "./_components/TripsClient";
import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { getReservations } from "@/actions/getReservations";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );
  }

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </Container>
  );
};

export default TripsPage;
