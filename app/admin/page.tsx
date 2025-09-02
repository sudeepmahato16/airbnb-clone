import BackButton from "@/components/BackButton";
import React from "react";
import AdminDashboard from "./AdminDashboard";

const AdminPage = ({
  searchParams,
}: {
  searchParams: {
    [x: string]: string | string[] | undefined;
  };
}) => {
  const tab = searchParams?.tab;
  return (
    <section className="main-container flex flex-col gap-4">
      <div
        className="flex justify-between
      "
      >
        <h1 className="text-xl font-semibold leading-[1.2] capitalize">
          {tab || "dashboard"}
        </h1>
        <BackButton />
      </div>
      <AdminDashboard tab={tab as string} />
    </section>
  );
};

export default AdminPage;
