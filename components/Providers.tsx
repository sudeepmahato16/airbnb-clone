"use client";
import React, { PropsWithChildren, Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RegisterModal from "./modals/RegisterModal";
import RentModal from "./modals/RentModal";
import LoginModal from "./modals/LoginModal";
import SearchModal from "./modals/SearchModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader showSpinner={false} color="#f40701" height={2.5} />
      <Toaster />
      <Suspense fallback={<></>}>
        <SearchModal />
      </Suspense>
      <RegisterModal />
      <RentModal />
      <LoginModal />
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
