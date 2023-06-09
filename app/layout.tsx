import { Nunito } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import RentModal from "@/components/modals/RentModal";
import ToasterProvider from "@/providers/ToasterProvider";
import getCurrentUser from "@/actions/getCurrentUser";
import SearchModal from "@/components/modals/SearchModal";

export const metadata = {
  title: "VacationHub",
  description:
    "Your Ultimate Destination Connection. Discover a world of endless possibilities and seamless vacation planning at VacationHub.",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={font.className}>
        <ToasterProvider />
        <SearchModal />
        <RegisterModal />
        <RentModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <main className="pb-20 pt-28">{children}</main>
      </body>
    </html>
  );
}
