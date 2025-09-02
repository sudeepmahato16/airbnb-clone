import { db } from "@/lib/db";
import React from "react";
import UserTable from "./UsersTable";

const Users = async () => {
  const users = await db.user.findMany({
    where: {
      email: {
        not: process.env.ADMIN,
      },
    },
  });

  return <UserTable users={users}/>
};

export default Users;
