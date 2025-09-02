import Table from "@/components/Table";
import React from "react";

const ListingRow = ({
  name,
  category,
  country,
  price,
  createdAt,
}: {
  name: string;
  category: string;
  country: string;
  price: number;
  createdAt: Date;
}) => {
  return (
    <Table.Row>
      <h4 className="text-[14px] text-gray-600 capitalize font-semibold">
        {name}
      </h4>
      <span className="text-gray-600  text-[14px]">{category}</span>
      <span className="text-gray-600  text-[14px]">{country}</span>
      <span className="text-gray-600  text-[14px]">${price}</span>
      <span className="text-gray-600  text-[14px]">
        {new Date(createdAt).toLocaleDateString()}
      </span>
    </Table.Row>
  );
};

export default ListingRow;
