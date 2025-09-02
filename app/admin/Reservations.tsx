import { db } from "@/lib/db";
import React from "react";
import ReservationsTable from "./RservationsTable";

const Reservations = async () => {
  const reservations = await db.reservation.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
      listing: {
        select: {
          title: true
        }
      }
    },
  });

  return <ReservationsTable reservations={reservations} />;
};

export default Reservations;
