import axios from "axios";
import queryString from "query-string";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  country?: string;
  category?: string;
}

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
