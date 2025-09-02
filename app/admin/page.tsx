import BackButton from "@/components/BackButton";
import React from "react";
import AdminDashboard from "./AdminDashboard";
import { getCurrentUser } from "@/services/user";
import { redirect } from "next/navigation";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: {
    [x: string]: string | string[] | undefined;
  };
}) => {
  const user = await getCurrentUser();

  if(user?.email !== process.env.ADMIN) return redirect("/")

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
