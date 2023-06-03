"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import Slider from "../Slider";
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
      <Slider>
        {categories.map((item: Category) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </Slider>
    </Container>
  );
};

export default Categories;
