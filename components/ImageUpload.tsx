import React, { ChangeEvent, FC, useState, useTransition } from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

import SpinnerMini from "./Loader";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/utils/helper";

interface ImageUploadProps {
  onChange: (fieldName: string, imgSrc: string) => void;
  initialImage?: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, initialImage = "" }) => {
  const [image, setImage] = useState(initialImage);
  const [isLoading, startTransition] = useTransition();
  const [isDragging, setIsDragging] = useState(false);
  const { edgestore } = useEdgeStore();

  const uploadImage = (e: any, file: File) => {
    if(!file.type.startsWith("image")) return;
    setImage(URL.createObjectURL(file));
    startTransition(async () => {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: initialImage,
        },
      });

      onChange("image", res.url);
      setTimeout(() => {
        e.target.form?.requestSubmit();
      }, 1000);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    uploadImage(e, file);
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
    uploadImage(e, e.dataTransfer.files[0])
  }

  return (
    <label
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      htmlFor="hotel"
      className={cn(
        " relative cursor-pointer hover:opacity-70 transition border-dashed  border-2 p-20 border-neutral-300 w-full h-[240px] flex flex-col justify-center items-center   text-neutral-600 ",
        isLoading && "opacity-70",
        isDragging && "border-red-500"
      )}
    >
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-20">
          {" "}
          <SpinnerMini className="w-[32px] h-[32px] text-red-600" />
        </div>
      )}
      {image ? (
        <div className="absolute inset-0 w-full h-full">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={image}
            alt="hotel"
            sizes="100vw"
            className="z-10"
            unoptimized
          />
        </div>
      ) : (
        <>
          <TbPhotoPlus className="!w-[64px] !h-[64px] mb-4" />
          <span className="font-semibold text-lg">Upload image</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        id="hotel"
        className="w-0 h-0 opacity-0"
        onChange={handleChange}
        autoFocus
      />
    </label>
  );
};

export default ImageUpload;
