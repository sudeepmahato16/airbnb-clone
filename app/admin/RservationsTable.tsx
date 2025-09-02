"use client"
import Table from "@/components/Table";
import { Reservation } from "@prisma/client";
import React from "react";
import ReservationTableRow from "./ReservationTableRow";

const RservationsTable = ({
  reservations,
}: {
  reservations: Reservation[];
}) => {
  return (
    <div className="w-full">
      <Table columns="240px 1fr 200px 200px 200px" className="w-full max-h-[90vh]">
        <Table.Header>
          <span>Listing Name</span>
          <span>Reserved By</span>
          <span>Start Date</span>
          <span>End Date</span>
          <span>Total price</span>
        </Table.Header>
        <Table.Body
          data={reservations}
          render={(reservation) => (
            <ReservationTableRow
              key={reservation.id}
              bookedBy={reservation.user.name}
              endDate={reservation.endDate}
              startDate={reservation.startDate}
              name={reservation?.listing?.title}
              totalPrice={reservation.totalPrice}
            />
          )}
          emptyMessage="No users found."
        />
      </Table>
    </div>
  );
};

export default RservationsTable;
