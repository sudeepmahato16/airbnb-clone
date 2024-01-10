import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import Categories from "./Categories";
import UserMenu from "./UserMenu";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white z-10 ">
      <nav className="py-3 border-b-[1px]">
        <div className="flex main-container flex-row justify-between items-center gap-3 md:gap-0">
          <Logo />
          <Search />
          <UserMenu />
        </div>
      </nav>
      <Categories />
    </header>
  );
};

export default Navbar;
