"use client";
import React from "react";
import { Range } from "react-date-range";

import Calendar from "../inputs/Calendar";
import Button from "../Button";

import { formatPrice } from "@/utils/helper";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabledDates,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-lg font-semibold">$ {formatPrice(price)}</span>
        <span className="font-light text-neutral-600">night</span>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div
        className="p-4 flex flex-row items-center justify-between font-semibold text-lg
    "
      >
        <span>Total</span>
        <span>$ {formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
};

export default ListingReservation;
