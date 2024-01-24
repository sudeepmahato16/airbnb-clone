import React, { ChangeEvent, FC, useState, useTransition } from "react";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/utils/helper";

interface ImageUploadProps {
  onChange: (fieldName: string, imgSrc: string) => void;
  initialImage?: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, initialImage = "" }) => {
  const [image, setImage] = useState(initialImage);
  const [isLoading, startTransition] = useTransition();
  const { edgestore } = useEdgeStore();

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    startTransition(async () => {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: initialImage,
        },
      });

      onChange("image", res.url);
      e.target.form?.requestSubmit();
    });
  };

  return (
    <label
      htmlFor="hotel"
      className={cn(
        " relative cursor-pointer hover:opacity-70 transition border-dashed  border-2 p-20 border-neutral-300 w-full h-[240px] flex flex-col justify-center items-center   text-neutral-600 ",
        isLoading && "opacity-70"
      )}
    >
      {image ? (
        <div className="absolute inset-0 w-full h-full">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={image}
            alt="hotel"
            sizes="100vw"
            className="z-10"
          />
        </div>
      ) : (
        <>
          <TbPhotoPlus className="!w-[64px] !h-[64px] mb-4" />
          <span className="font-semibold text-lg">Click to upload</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        id="hotel"
        className="w-0 h-0 opacity-0"
        onChange={handleImage}
        autoFocus
      />
    </label>
  );
};

export default ImageUpload;
