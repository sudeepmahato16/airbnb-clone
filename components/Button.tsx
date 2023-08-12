import React, { ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  outline,
  small,
  icon: Icon,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded hover:opacity-80 transition w-full ${
        outline
          ? "bg-white border-[1px] border-gray-500 text-[#4e4e4e]"
          : "bg-rose-500 border-rose-500 text-white"
      }  ${small ? "text-sm" : "text-md"} ${
        small ? "py-[6px] text-[14px]" : "py-[8px] text-[15px]"
      } ${small ? "font-light" : "font-semibold"} ${
        small ? "border-[1px]" : "border-2"
      }

      ${className}
  `}
      {...props}
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
      {children}
    </button>
  );
};

export default Button;
