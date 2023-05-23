"use client";

import React, { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const registerModal = useRegisterModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const currentUser = undefined;

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer text-[#585858]">
          Airbnb your home
        </div>

        <div
          className=" p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition duration-300"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
        className="absolute rounded-xl shadow-[0_0_16px_4px_rgba(0,0,0,0.035)] w-[40vw] md:w-3/4  bg-white overflow-hidden right-0 top-12 text-sm
      "
        >
          <div className="flex flex-col cursor-pointer">
            <MenuItem label="Login" onClick={() => {}} />
            <MenuItem label="Sign up" onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
