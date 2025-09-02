import React from "react";
import Tabs from "./Tabs";
import Users from "./Users";
import Reservations from "./Reservations";
import Listings from "./Listings";

const AdminDashboard = ({ tab }: { tab: string }) => {
  const renderTable = () => {
    switch (tab) {
      case "users":
        return <Users />;
      case "listings":
        return <Listings />;

      case "reservations":
        return <Reservations />;

      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col gap-6">
      {!tab && <Tabs tab={tab} />}
      {renderTable()}
    </div>
  );
};

export default AdminDashboard;
