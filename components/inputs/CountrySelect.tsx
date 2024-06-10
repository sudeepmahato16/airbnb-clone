"use client";
import React, { useEffect, useRef } from "react";
import Select from "react-select";
import countries from "@/data/countries.json";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

const CountrySelect = ({
  value,
  onChange,
}: {
  value?: CountrySelectValue;
  onChange: (name: string, val: CountrySelectValue) => void;
}) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (value: CountrySelectValue) => {
    onChange("location", value);
  };

  return (
    <Select
      ref={ref}
      placeholder="Anywhere"
      isClearable
      options={countries}
      value={value}
      onChange={handleChange}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3 z-[10]">
          <div>{option.flag}</div>
          <div>
            {option.label},
            <span className="text-neutral-500 ml-1">{option.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control: () => "p-[6px] text-[14px] border-1",
        input: () => "text-[14px]",
        option: () => "text-[14px]",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6",
        },
      })}
    />
  );
};

export default CountrySelect;
