import React, { useTransition, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import Modal from "../Modal";
import SpinnerMini from "../Loader";
import { registerUser } from "@/services/auth";

const AuthModal = ({
  name,
  onCloseModal,
}: {
  name?: string;
  onCloseModal?: () => void;
  
}) => {
  const [isLoading, startTransition] = useTransition();
  const [title, setTitle] = useState(name || "");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const isLoginModal = title === "Login";
  const router = useRouter();

  const onToggle = () => {
    const newTitle = isLoginModal ? "Sign up" : "Login";
    setTitle(newTitle);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { email, password, name } = data;

    startTransition(async () => {
      try {
        if (isLoginModal) {
          signIn("credentials", {
            email,
            password,
            redirect: false,
          }).then((callback) => {
            console.log(callback);
            if (callback?.error) {
              toast.error(callback.error);
              return;
            }
            if (callback?.ok) {
              toast.success("You've successfully logged in.");
              onCloseModal?.();
              router.refresh();
            }
          });
        } else {
          await registerUser({ email, password, name });
          setTitle("Login");
          toast.success("You've successfully registered.");
          reset();
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div>
      <Modal.WindowHeader title={title} />

      <form
        className="flex flex-col gap-5 p-6 pb-0 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading
          title={!isLoginModal ? "Welcome to Airbnb" : "Welcome back"}
          subtitle={
            title === "Sign up"
              ? "Create an account!"
              : "Login to your account!"
          }
        />

        {!isLoginModal && (
          <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            watch={watch}
          />
        )}

        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          watch={watch}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          watch={watch}
        />

        <Button
          type="submit"
          className="flex items-center justify-center h-[42px]"
        >
          {isLoading ? <SpinnerMini className="w-5 h-5" /> : "Continue"}
        </Button>
      </form>
      <div className="flex flex-col gap-4 mt-3 p-6 pt-0">
        <hr />
        <Button
          outline
          onClick={() => signIn("google")}
          className="flex flex-row justify-center gap-2 items-center px-3 py-2"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="text-[14px]">Continue with Google</span>
        </Button>
        <Button
          outline
          onClick={() => signIn("github")}
          className="flex flex-row justify-center gap-2 items-center px-3 py-2"
        >
          <AiFillGithub className="w-6 h-6" />
          <span className="text-[14px]">Continue with Github</span>
        </Button>
        <div
          className="
            text-neutral-500 
          text-center 
          mt-2 
          font-light
        "
        >
          <div className="text-[15px]">
            <small className="text-[15px]">
              {!isLoginModal
                ? "Already have an account?"
                : "First time using Airbnb?"}
            </small>
            <button
              type="button"
              onClick={onToggle}
              className="
              text-neutral-800
              cursor-pointer 
              hover:underline
              ml-1
              font-medium
              "
            >
              {!isLoginModal ? "Log in" : "Create an account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
