"use client";

import React, { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { categories } from "@/constants";
import { Category } from "@/types";

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const category = params?.get("category");

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <Swiper slidesPerView="auto"
        pagination={{
          clickable: true,
        }} className="w-full mt-2">
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
    </Container>
  );
};

export default Categories;




