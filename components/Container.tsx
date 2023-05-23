"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[1140px] mx-auto lg:px-0 md:px-6 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
