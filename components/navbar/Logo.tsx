import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/vacationhub.png"
        alt="logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="150"
      />
    </Link>
  );
};

export default Logo;
