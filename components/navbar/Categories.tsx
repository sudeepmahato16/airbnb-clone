"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import debounce from "lodash.debounce";
import "swiper/css";

import CategoryBox from "./CategoryBox";
import { categories } from "@/utils/constants";
import { Category } from "@/types";

const Categories = () => {
  const [isActive, setIsActive] = useState(false);
  const params = useSearchParams();
  const pathname = usePathname();
  const category = params?.get("category");

  const isMainPage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };
    window.addEventListener("scroll", debounce(handleScroll, 250));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMainPage) {
    return null;
  }

  return (
    <div
      className={`main-container ${
        isActive ? "shadow-md shadow-[rgba(0,0,0,.045)]" : ""
      } transition-all duration-150`}
    >
      <Swiper
        slidesPerView="auto"
        pagination={{
          clickable: true,
        }}
        className="w-full mt-2"
      >
        {categories.map((item: Category) => (
          <SwiperSlide className="max-w-fit" key={item.label}>
            <CategoryBox
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
