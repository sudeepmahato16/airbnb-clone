import React, { FC, Suspense } from "react";
import VerfiyPayment from "./VerfiyPayment";
import { TbLoader2 } from "react-icons/tb";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const SuccessPage: FC<Props> = ({ searchParams: { data } }) => {
  if (typeof data !== "string") return <div>Something went wrong</div>;

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen">
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <TbLoader2 className="h-8 w-8 animate-spin text-zinc-500" />
              <h3 className="font-semibold text-xl">Verifying Your Payment...</h3>
              <p>Please wait a moment while we confirm your transaction</p>
            </div>
          </div>
        </div>
      }
    >
      <VerfiyPayment data={data} />
    </Suspense>
  );
};

export default SuccessPage;
