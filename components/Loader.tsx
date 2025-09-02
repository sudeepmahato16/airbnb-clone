import { BiLoaderAlt } from "react-icons/bi";

import React, { FC } from "react";

interface SpinnerMiniProps {
  className?: string;
}

interface LoaderProps {
  className?: string
}


export const Loader: FC<LoaderProps> = ({ className }) => (
  <div className={`orbit ${className}`}></div>
);

export const SpinnerMini: React.FC<SpinnerMiniProps> = ({ className }) => {
  return <BiLoaderAlt className={`w-5 h-5 animate-spin ${className}`} />;
};

export default SpinnerMini;
