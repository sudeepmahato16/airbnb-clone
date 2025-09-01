import { verifyEsewaData } from "@/lib/payment";
import React, { Suspense } from "react";
import ReserveListing from "./ReserveListing";
import { TbLoader2 } from "react-icons/tb";

interface IData {
  transaction_code: string;
  status: string;
  total_amount: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
  transaction_uuid: string;
}

const VerfiyPayment = async ({ data }: { data: string }) => {
  const { isValid, data: decodedData } = await verifyEsewaData(data);

  if (!isValid) return <div>Something went wrong</div>;

  const { transaction_uuid, total_amount } = decodedData as IData;

  const [startDate, endDate, listingId] = transaction_uuid.split("..");

  return (
    <Suspense
      fallback={
        <div className="mt-20">
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <TbLoader2 className="h-8 w-8 animate-spin text-zinc-500" />
              <h3 className="font-semibold text-xl">You&#39;re all booked!</h3>
              <p>Your reservation was successful. Redirecting you now...</p>
            </div>
          </div>
        </div>
      }
    >
      <ReserveListing
        totalAmount={Number(total_amount)}
        startDate={startDate}
        endDate={endDate}
        listingId={listingId}
      />
    </Suspense>
  );
};

export default VerfiyPayment;
