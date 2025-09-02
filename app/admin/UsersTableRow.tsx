import Table from "@/components/Table";
import React from "react";

const UsersTableRow = ({ name, email, createdAt, updatedAt }: { name: string; email: string, createdAt: Date, updatedAt: Date }) => {
  return (
    <Table.Row>
      <h4 className="text-[14px] text-gray-600 capitalize font-semibold">
        {name}
      </h4>
      <span className="text-gray-600  text-[14px]">
        {email}
      </span>
      <span className="text-gray-600  text-[14px]">
        {new Date(createdAt).toLocaleDateString()}
      </span>
      <span className="text-gray-600  text-[14px]">
        {new Date(updatedAt).toLocaleDateString()}
      </span>
    </Table.Row>
  );
};

export default UsersTableRow;
