import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const guestCount = 0;
  const guestLabel = guestCount ? `${guestCount} Guests` : "Add Guests";

  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition duration-300 cursor-pointer">
      <div className="flex flex-row justify-between items-center">
        <span className="text-sm font-bold px-6 text-[#585858]">Anywhere</span>
        <span className="hidden sm:block text-sm font-bold px-6 border-x-[1px] flex-1 text-center text-[#585858]">
          Any weeks
        </span>

        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-4">
          <div className="hidden sm:block font-normal">{guestLabel}</div>
          <div
            className="p-2  bg-rose-500 rounded-full  text-white"
          >
            <FaSearch className="text-[12px] " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
