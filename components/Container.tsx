import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[1140px] mx-auto xl:px-0 px-4">
      {children}
    </div>
  );
};

export default Container;
