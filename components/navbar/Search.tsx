"use client";
import React, { useMemo } from "react";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

import Modal from "../Modal";
import SearchModal from "../modals/SearchModal";

const Search = () => {
  const searchParams = useSearchParams();

  const country = searchParams?.get("country");

  const startDate = searchParams?.get("startDate");
  const endDate = searchParams?.get("endDate");
  const guestCount = searchParams?.get("guestCount");

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any week";
  }, [endDate, startDate]);

  const guestLabel = guestCount ? `${guestCount} Guests` : "Add Guests";

  return (
    <Modal>
      <Modal.Trigger name="search">
        <button
          type="button"
          className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
        >
          <div className="flex flex-row justify-between items-center">
            <small className="text-sm font-bold px-6 text-[#585858]">
              {country ? country : "Anywhere"}
            </small>

            <small className="hidden sm:block text-sm font-bold px-6 border-x-[1px] flex-1 text-center text-[#585858]">
              {durationLabel}
            </small>

            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-4">
              <small className="hidden sm:block font-normal text-sm">
                {guestLabel}
              </small>
              <div className="p-2  bg-rose-500 rounded-full  text-white">
                <FaSearch className="text-[12px] " />
              </div>
            </div>
          </div>
        </button>
      </Modal.Trigger>
      <Modal.Window name="search">
        <SearchModal />
      </Modal.Window>
    </Modal>
  );
};

export default Search;
