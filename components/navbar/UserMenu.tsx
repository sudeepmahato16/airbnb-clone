"use client";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import Menu from "@/components/Menu";
import { useRouter } from "next/navigation";

interface UserMenuProps {}

const UserMenu: React.FC<UserMenuProps> = () => {
  const router = useRouter();

  const redirect = (url: string) => {
    router.push(url);
  };

  const user = true;
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button
          type="button"
          className="hidden md:block text-sm font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer text-[#585858]"
        >
          Share your home
        </button>

        <Menu>
          <Menu.Toggle
            id="user-menu"
            className=" p-4 md:py-1 md:px-2 border-[1px]   border-neutral-200  flex  flex-row  items-center   gap-3   rounded-full   cursor-pointer   hover:shadow-md   transition duration-300"
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar src={""} />
            </div>
          </Menu.Toggle>
          <Menu.List className="shadow-[0_0_36px_4px_rgba(0,0,0,0.075)] rounded-xl bg-white text-sm">
            {user ? (
              <>
                <MenuItem label="My trips" onClick={() => redirect("/trips")} />
                <MenuItem
                  label="My favorites"
                  onClick={() => redirect("/favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => redirect("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => redirect("/properties")}
                />
                <MenuItem label="Share your home" />
                <hr />
                <MenuItem label="Log out" />
              </>
            ) : (
              <>
                <MenuItem label="Log in" />
                <MenuItem label="Sign up" />
              </>
            )}
          </Menu.List>
        </Menu>
      </div>
    </div>
  );
};

export default UserMenu;
