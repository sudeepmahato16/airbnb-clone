import { IconType } from "react-icons";

export interface User {
  name?: string;
  email?: string;
  image?: string;
  password?: string;
  favourite: string[];
  accounts: string[];
  listings: string[];
  reservations: string[];
}

export interface Category {
  label: string;
  icon: IconType;
  description?: string;
}
