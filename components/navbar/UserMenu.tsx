"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { IUser } from "@/types";
import useRentModal from "@/hooks/useRentModal";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface UserMenuProps {
  currentUser?: IUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const { ref } = useOutsideClick(close, false);

  function close() {
    setIsOpen(false);
  }

  const open = () => {
    setIsOpen((prev) => !prev);
  }

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    close();
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const navigate = (pathName: string) => {
    close();
    router.push(pathName);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer text-[#585858]"
          onClick={onRent}
        >
          Share your home
        </div>

        <div
          className=" p-4 md:py-1 md:px-2 border-[1px]   border-neutral-200  flex  flex-row  items-center   gap-3   rounded-full   cursor-pointer   hover:shadow-md   transition duration-300"
          onClick={open}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={ref}
          className="absolute rounded-xl shadow-[0_0_16px_4px_rgba(0,0,0,0.035)] w-[40vw] md:w-3/4  bg-white overflow-hidden right-0 top-12 text-sm
          z-[10]
      "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="My trips" onClick={() => navigate("/trips")} />
                <MenuItem
                  label="My favorites"
                  onClick={() => navigate("/favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => navigate("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => navigate("/properties")}
                />
                <MenuItem label="Share your home" onClick={onRent} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
