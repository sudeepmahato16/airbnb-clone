import axios from "axios";

export const getCountry = async (label: string) => {
  try {
    if(!label) return {label: "Anywhere"}
    const {data} = await axios.get(`/api/countries/${label}`);
    return data;
  } catch (error) {
    return {label: "Anywhere"}
  }
}