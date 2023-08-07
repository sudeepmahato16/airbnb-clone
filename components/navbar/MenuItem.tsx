import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold select-none"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
