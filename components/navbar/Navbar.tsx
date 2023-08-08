import React, { Suspense } from "react";
import { User } from "@prisma/client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-10 ">
      <div className="py-3 border-b-[1px]">
        <Container>
          <div className="flex flex-row justify-between items-center gap-3 md:gap-0">
            <Logo />
            <Suspense fallback={<></>}>
              <Search />
            </Suspense>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>

      <Suspense fallback={<></>}>
        <Categories />
      </Suspense>
    </nav>
  );
};

export default Navbar;


