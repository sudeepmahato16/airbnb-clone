"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded hover:opacity-80 transition w-full ${
        outline
          ? "bg-white border-[1px] border-gray-500 text-[#4e4e4e]"
          : "bg-rose-500 border-rose-500 text-white"
      }  ${small ? "text-sm" : "text-md"} ${
        small ? "py-1 text-[14px]" : "py-[10px] text-[15px]"
      } ${small ? "font-light" : "font-semibold"} ${
        small ? "border-[1px]" : "border-2"
      }
  `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
