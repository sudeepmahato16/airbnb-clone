"use client";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";
import SpinnerMini from "../loader/Loader";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { ref } = useOutsideClick(handleClose, false);

  useEffect(() => {
    setShowModal(Boolean(isOpen));
  }, [isOpen]);

  function handleClose() {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (disabled) return;
    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`justify-center items-center flex w-screen h-screen overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 duration-300 ${
          showModal ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="relative w-full md:w-4/6 lg:max-w-[420px] rounded-lg hide-scrollbar overflow-y-scroll"
        >
          <div
            className={`duration-300 md:max-h-[90vh] h-full   ${
              showModal ? "translate-y-0" : "translate-y-full"
            }
            ${showModal ? "opacity-100" : "opacity-0"}`}
            ref={ref}
          >
            <form
              className="translate h-full lg:h-auto  md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none "
              onSubmit={handleSubmit}

            >
              <div className=" flex items-center  px-6 py-4  rounded-t justify-center relative border-b-[1px]">
                <button
                type="button"
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-6
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              <div className="relative p-6 flex-auto">{body}</div>
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                    type="button"
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button type="submit" disabled={disabled} className="flex items-center gap-2 justify-center">
                    {disabled ? <SpinnerMini /> : actionLabel}
                  </Button>
                </div>
                {footer}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
