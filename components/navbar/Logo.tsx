import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="h-[35px] w-[150px] relative hidden md:block ">
      <Image
        src="/images/vacationhub.png"
        alt="logo"
        fill
        sizes="150px"
      />
    </Link>
  );
};

export default Logo;
