import Table from "@/components/Table";
import React from "react";

const ReservationTableRow = ({ name, startDate, endDate, totalPrice, bookedBy }: { name: string; bookedBy: string, startDate: Date, endDate: Date, totalPrice: number }) => {
  return (
    <Table.Row>
      <h4 className="text-[14px] text-gray-600 capitalize font-semibold">
        {name}
      </h4>
      <span className="text-gray-600  text-[14px]">
        {bookedBy}
      </span>
      <span className="text-gray-600  text-[14px]">
        {new Date(startDate).toLocaleDateString()}
      </span>
      <span className="text-gray-600  text-[14px]">
        {new Date(endDate).toLocaleDateString()}
      </span>
      <span className="text-gray-600  text-[14px]">
        ${totalPrice}
      </span>
    </Table.Row>
  );
};

export default ReservationTableRow;
