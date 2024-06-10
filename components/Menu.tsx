"use client";
import React, {
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { zoomIn } from "@/utils/motion";
import { cn } from "@/utils/helper";
import { useKeyPress } from "@/hooks/useKeyPress";

const MenuContext = createContext({
  openId: "",
  setOpenId: (val: string) => { },
  close: () => { },
});

interface ToggleProps {
  children: ReactElement;
  id: string;
  className?: string;
}

const Toggle: FC<ToggleProps> = ({ children, id, className }) => {
  const { setOpenId, close, openId } = useContext(MenuContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    (openId === "" || openId !== id) ? setOpenId(id) : close();
  };

  return <>{cloneElement(children, { onClick: handleClick })}</>;
};

interface ListProps {
  children: ReactNode;
  className?: string;
  position?: "bottom-left" | "bottom-right";
}

const List: FC<ListProps> = ({
  children,
  className,
  position = "bottom-right",
}) => {
  const { openId, close } = useContext(MenuContext);
  const { ref } = useOutsideClick({
    action: close,
    listenCapturing: false,
    enable: !!openId
  });
  
  useKeyPress({
    key: "Escape",
    action: close,
    enable: !!openId
  });

  return (
    <AnimatePresence>
      {!openId ? null : (
        <motion.ul
          ref={ref}
          variants={zoomIn(0.85, 0.175)}
          initial="hidden"
          animate="show"
          exit="hidden"
          style={{
            originY: 0,
          }}
          className={cn(
            `absolute top-[110%]  w-max min-w-[170px] bg-white rounded-sm z-[9999] text-[12px] overflow-hidden `,
            className,
            position === "bottom-left" ? "left-0" : "right-0"
          )}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, onClick, className }) => {
  const { close } = useContext(MenuContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    close();
    onClick?.(e);
  };

  return (
    <li className={"w-full"}>
      <button
        onClick={handleClick}
        type="button"
        className={cn("text-left px-4 py-3 w-full", className)}
      >
        {children}
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
      <div className="flex items-center justify-end relative rounded-md">
        {children}
      </div>
    </MenuContext.Provider>
  );
};

Menu.Toggle = Toggle;
Menu.Button = Button;
Menu.List = List;

export default Menu;
