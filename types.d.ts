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
