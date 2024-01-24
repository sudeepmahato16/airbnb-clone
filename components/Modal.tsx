"use client";
import React, {
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

import { fadeIn, slideIn } from "@/utils/motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { useIsClient } from "@/hooks/useIsClient";

interface ModalProps {
  children: ReactNode;
}

interface TriggerProps {
  name: string;
  children: ReactElement;
}

interface WindowProps extends TriggerProps {}

interface WindowHeaderProps {
  title: string;
}

const ModalContext = createContext({
  open: (val: string) => {},
  close: () => {},
  openName: "",
});

const Modal: FC<ModalProps> & {
  Trigger: typeof Trigger;
  Window: typeof Window;
  WindowHeader: typeof WindowHeader;
} = ({ children }) => {
  const [openName, setOpenName] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (openName && e.key === "Escape") {
        setOpenName("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openName]);

  const close = useCallback(() => {
    setOpenName("");
  }, []);

  const open = setOpenName;
  return (
    <ModalContext.Provider
      value={{
        open,
        close,
        openName,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const Trigger: FC<TriggerProps> = ({ children, name }) => {
  const { open } = useContext(ModalContext);
  const onClick = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    open(name);
  };
  return cloneElement(children, { onClick });
};

const Window: FC<WindowProps> = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const { ref } = useOutsideClick(close);
  const isClient = useIsClient();

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {openName === name ? (
        <motion.div
          variants={fadeIn}
          animate="show"
          initial="hidden"
          exit="hidden"
          className="justify-center items-center flex w-full h-full overflow-hidden  fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
        >
          <div className="relative ">
            <motion.div
              variants={slideIn("up", "tween", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="md:h-auto h-full max-h-screen overflow-y-auto rounded-lg shadow-lg w-full bg-white md:w-[420px]"
              ref={ref}
            >
              {cloneElement(children, { onCloseModal: close })}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

const WindowHeader: FC<WindowHeaderProps> = ({ title }) => {
  const { close } = useContext(ModalContext);
  return (
    <header className=" flex items-center  px-6 py-3  rounded-t justify-center relative border-b-[1px]">
      <button
        type="button"
        className=" p-1 border-0  hover:opacity-70 transition absolute left-6"
        onClick={close}
      >
        <IoMdClose size={18} />
      </button>
      <h4 className="text-[18px] font-semibold">{title}</h4>
    </header>
  );
};

Modal.Trigger = Trigger;
Modal.Window = Window;
Modal.WindowHeader = WindowHeader;

export default Modal;
