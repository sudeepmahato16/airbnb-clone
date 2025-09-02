import Link from "next/link";
import React from "react";
import { FaHotel, FaUsers } from "react-icons/fa";

import { SlCalender } from "react-icons/sl";

const TABS = ["users", "listings", "reservations"];

const Tabs = ({ tab }: { tab: string }) => {
  return (
    <ul className="flex items-center  flex-wrap gap-6">
      {TABS.map((tab) => (
        <li key={tab}>
          <Link
            href={`/admin?tab=${tab}`}
            className="w-[180px] p-6 flex flex-col gap-2 items-center text-base hover:border-red-400 border rounded-lg border-gray-200 capitalize"
          >
            {tab === "users" ? (
              <FaUsers className="text-xl" />
            ) : tab === "listings" ? (
              <FaHotel className="text-xl" />
            ) : (
              <SlCalender className="text-xl" />
            )}
            <span>{tab}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
