import axios from "axios";

export const getCountries = async () => {
  try {
    const {data} = await axios.get("/api/countries");
    console.log(data)
    return data;
  } catch (error) {
    throw new Error("Failed to fetch countries!");
  }
};
