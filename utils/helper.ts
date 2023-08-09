import countries from "world-countries";

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US").format(price);
};

export const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  region: country.region,
  latlng: country.latlng,
}));

export const getCountryByLabel = (value: string) => {
  return formattedCountries.find((item) => item.label === value);
};
