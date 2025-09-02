"use client";
import React, {
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";
import { User } from "next-auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface PaymentResponse {
  amount: string;
  esewaConfig: EsewaConfigData;
}

import ListingReservation from "./ListingReservation";
import {
  createPaymentSession,
  createReservation,
} from "@/services/reservation";
import { EsewaConfigData } from "@/types";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: {
    startDate: Date;
    endDate: Date;
  }[];
  children: ReactNode;
  id: string;
  title: string;
  price: number;
  user:
    | (User & {
        id: string;
      })
    | undefined;
}

const ListingClient: React.FC<ListingClientProps> = ({
  price,
  reservations = [],
  children,
  user,
  id,
  title,
}) => {
  const [totalPrice, setTotalPrice] = useState(price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
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

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && price) {
        setTotalPrice((dayCount + 1) * price);
      } else {
        setTotalPrice(price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, price]);

  const onCreateReservation = () => {
    if (!user) return toast.error("Please log in to reserve listing.");
    startTransition(async () => {
      try {
        const { endDate, startDate } = dateRange;
        const paymentData: PaymentResponse = await createPaymentSession({
          listingId: id,
          endDate,
          startDate,
          totalPrice: totalPrice * 141.24,
        });

        // if(res?.url){
        //   router.push(res.url);
        // }

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        const esewaPayload = {
          amount: paymentData.amount,
          tax_amount: paymentData.esewaConfig.tax_amount,
          total_amount: paymentData.esewaConfig.total_amount,
          transaction_uuid: paymentData.esewaConfig.transaction_uuid,
          product_code: paymentData.esewaConfig.product_code,
          product_service_charge:
            paymentData.esewaConfig.product_service_charge,
          product_delivery_charge:
            paymentData.esewaConfig.product_delivery_charge,
          success_url: paymentData.esewaConfig.success_url,
          failure_url: paymentData.esewaConfig.failure_url,
          signed_field_names: paymentData.esewaConfig.signed_field_names,
          signature: paymentData.esewaConfig.signature,
        };

        Object.entries(esewaPayload).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      } catch (error: any) {
        toast.error(error?.message);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
      {children}

      <div className="order-first mb-10 md:order-last md:col-span-3">
        <ListingReservation
          price={price}
          totalPrice={totalPrice}
          onChangeDate={(name, value) => setDateRange(value)}
          dateRange={dateRange}
          onSubmit={onCreateReservation}
          isLoading={isLoading}
          disabledDates={disabledDates}
        />
      </div>
    </div>
  );
};

export default ListingClient;
