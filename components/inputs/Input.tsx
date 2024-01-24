import React, { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { cn } from "@/utils/helper";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: IconType;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  watch: UseFormWatch<FieldValues>;
  autoFocus?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  icon: Icon,
  register,
  errors,
  watch,
  autoFocus = false,
  type = "text",
  disabled,
  ...props
}) => {
  const value = watch(id);

  return (
    <div className="w-full relative">
      {Icon && <Icon size={20} className="absolute top-[13px] left-2 text-[#666]" />}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required: true })}
        className={cn(
          `text-[15px] peer w-full px-2 py-3 font-light bg-white border-[1px] border-gray-400 rounded outline-none transition disabled:opacity-70 disabled:cursor-not-allowed`,
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-black",
          Icon ? "pl-9" : "pl-4"
        )}
        autoFocus={autoFocus}
        {...props}
      />
      <label
        className={cn(
          `absolute  text-[14px] duration-150  transform  top-[28px] scale-80 -translate-y-4 origin-[0] peer-placeholder-shown:scale-100  peer-placeholder-shown:translate-y-0  peer-focus:scale-80 peer-focus:-translate-y-[40px] peer-focus:bg-[#fff] z-[20] px-1 `,
          errors[id] ? "text-rose-500" : "text-zinc-400",
          value && "-translate-y-[40px] bg-[#fff]",
          Icon ? "left-9" : "left-4"
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
