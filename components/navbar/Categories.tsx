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
        }} spaceBetween={20}>
        {categories.map((item: Category) => (
          <SwiperSlide key={item.label} className="max-w-fit">
            <Suspense fallback={<></>}>
              <CategoryBox
                label={item.label}
                icon={item.icon}
                selected={category === item.label}
              />
            </Suspense>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Categories;
