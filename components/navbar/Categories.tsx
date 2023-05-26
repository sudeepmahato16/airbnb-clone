'use client'

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

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
      <div className="pt-3 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item: Category) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
