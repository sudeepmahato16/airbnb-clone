"use client";
import React from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/actions/getCountries";
import Skeleton from "react-loading-skeleton";

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
  onChange: (val: CountrySelectValue) => void;
}) => {
  const { data: countries, isLoading } = useQuery({
    queryFn: getCountries,
    queryKey: ["countries"],
  });

  if (isLoading) return <Skeleton height={48} width={"100%"} />;

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={countries}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
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
    </div>
  );
};

export default CountrySelect;
