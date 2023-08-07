import React from "react";
import { Category } from "@/types";

interface CategoryInputProps extends Category {
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
    rounded-xl border-2 p-2 flex flex-col gap-3  hover:border-black transition cursor-pointer
    ${selected ? "border-black" : "border-neutral-200"}
  `}
    >
      <Icon size={24} />
      <div className="font-semibold text-sm select-none">{label}</div>
    </div>
  );
};

export default CategoryInput;
