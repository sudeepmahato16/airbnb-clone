"use client";
import React, { PropsWithChildren, Suspense } from "react";
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
