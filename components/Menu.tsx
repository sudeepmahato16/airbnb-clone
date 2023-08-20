"use client";
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { IconType } from "react-icons";

const MenuContext = createContext({
  openId: "",
  setOpenId: (val: string) => {},
  close: () => {},
});

interface ToggleProps {
  children: ReactNode;
  id: string;
  className?: string;
}

const Toggle: FC<ToggleProps> = ({ children, id, className }) => {
  const { setOpenId, close, openId } = useContext(MenuContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    openId === "" || openId !== id ? setOpenId(id) : close();
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

interface ListProps {
  children: ReactNode;
}

const List: FC<ListProps> = ({ children }) => {
  const { openId, close } = useContext(MenuContext);
  const { ref } = useOutsideClick(close, false);

  if (!openId) return null;

  return (
    <ul
      ref={ref}
      className={`absolute top-[110%] left-[5%] w-auto bg-white shadow-md rounded-md z-[9999] text-[12px]`}
    >
      {children}
    </ul>
  );
};

interface ButtonProps {
  children: ReactNode;
  icon: IconType;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, icon: Icon, onClick }) => {
  const { close } = useContext(MenuContext);
  const handleClick = () => {
    close();
    onClick?.();
  };

  return (
    <li className="min-w-[180px]">
      <button
        onClick={handleClick}
        className="w-full text-left bg-[#fff] hover:bg-gray-50 border-none py-2 px-4 text-[13.25px] transition-all duration-200 flex items-center gap-4"
        type="button"
      >
        <Icon className="w-4 h-4 stroke-gray-700 text-gray-700" />
        <span className=" ">{children}</span>
      </button>
    </li>
  );
};

interface MenuProps {
  children: ReactNode;
}

const Menu: FC<MenuProps> & {
  Toggle: typeof Toggle;
  List: typeof List;
  Button: typeof Button;
} = ({ children }) => {
  const [openId, setOpenId] = useState<string>("");

  const close = () => setOpenId("");

  return (
    <MenuContext.Provider
      value={{
        openId,
        setOpenId,
        close,
      }}
    >
      <div className="flex items-center justify-end relative rounded-md shadow-md ">{children}</div>
    </MenuContext.Provider>
  );
};

Menu.Toggle = Toggle;
Menu.Button = Button;
Menu.List = List;

export default Menu;
