import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VacationHub",
  description:
    "Your Ultimate Destination Connection. Discover a world of endless possibilities and seamless vacation planning at VacationHub.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        <main className="pb-20 md:pt-28 pt-24">{children}</main>
      </body>
    </html>
  );
}
