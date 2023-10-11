import axios from "axios";
import queryString from "query-string";

export const getListings = async (query: {}) => {
  const urlWithQuery = queryString.stringifyUrl(
    {
      url: "/api/listings",
      query,
    },
    { skipNull: true }
  );

  try {
    const {data} = await axios.get(urlWithQuery);


    return data;
  } catch (error) {
    throw new Error("Failed to fetch listings");
  }
};
