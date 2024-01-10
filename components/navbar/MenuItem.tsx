"use client";
import React, { FC } from "react";
import Menu from "../Menu";

interface MenuItemProps {
  onClick?: () => void;
  label: string;
}

const MenuItem: FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <Menu.Button
      className=" hover:bg-neutral-100 transition font-semibold select-none"
      onClick={onClick}
    >
      {label}
    </Menu.Button>
  );
};

export default MenuItem;
