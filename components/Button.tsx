import React, { ReactNode } from "react";
import { cn } from "@/utils/helper";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  size?: "small" | "large";
  className?: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  className,
  size = "small",
  ...props
}) => {
  return (
    <button
      className={cn(
        `disabled:opacity-70 disabled:cursor-not-allowed rounded hover:opacity-80 transition w-full bg-rose-500 border-rose-500 text-white`,
        size === "small"
          ? "text-sm py-[6px] text-[14px] font-light border-[1px]"
          : "text-md py-[8px] text-[15px] font-semibold  border-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
