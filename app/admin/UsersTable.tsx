"use client";
import Table from "@/components/Table";
import { User } from "@prisma/client";
import React from "react";
import UsersTableRow from "./UsersTableRow";

const UserTable = ({ users }: { users: User[] }) => {
  return (
    <div className="w-full">
      <Table columns="240px 1fr 200px 200px" className="w-full max-h-[90vh]">
        <Table.Header>
          <span>Name</span>
          <span>Email</span>
          <span>created At</span>
          <span>updated At</span>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => (
            <UsersTableRow
              key={user.id}
              name={user.name}
              email={user.email}
              createdAt={user.createdAt}
              updatedAt={user.updateAt || user.createdAt}
            />
          )}
          emptyMessage="No users found."
        />
      </Table>
    </div>
  );
};

export default UserTable;
