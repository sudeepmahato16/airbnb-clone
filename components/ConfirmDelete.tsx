"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "./Button";
import SpinnerMini from "./loader/Loader";

import useConfirmDelete from "@/hooks/useConfirmDelete";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { slideIn } from "@/utils/motion";

interface ConfirmDeleteProps {
  title: string;
  desc: string;
  onConfirm: (fn?: () => void) => void;
  isLoading?: boolean;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  title,
  onConfirm,
  isLoading,
  desc
}) => {
  const { isOpen, onClose } = useConfirmDelete();
  const { ref } = useOutsideClick(onClose);

  const onDelete = () => {
    onConfirm(onClose);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0 }}
          className={`justify-center items-center flex w-screen h-screen overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70`}
        >
          <motion.div
            variants={slideIn("up", "tween", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-[400px] flex flex-col gap-3 bg-white p-8 rounded-md"
            ref={ref}
          >
            <h1 className="text-[20px] font-medium ">
              {title}
            </h1>
            <p className="text-gray-500  text-[14px] leading-[1.6] mb-6">
              {desc}
            </p>

            <div className="flex justify-end gap-3">
              <Button disabled={isLoading} onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="flex items-center gap-2 justify-center"
                disabled={isLoading}
                onClick={onDelete}
              >
                {isLoading ? <SpinnerMini />:<span>Confirm</span>}
                
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDelete;
