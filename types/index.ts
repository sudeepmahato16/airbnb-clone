import { IconType } from "react-icons";

export interface IUser {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
  password?: string;
  favorites: string[];
  accounts: string[];
  listings: string[];
  reservations: string[];
}

export interface IListing {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  price: number;
  user: string;
  reservations: [string];
}

export interface IReservation {
  _id: string;
  user: string;
  listing: string | IListing;
  startDate: string;
  endDate: string;
  totalPrice: number;
}


export interface Category {
  label: string;
  icon: IconType;
  description?: string;
}
