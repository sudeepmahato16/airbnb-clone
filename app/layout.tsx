import { Nunito } from "next/font/google";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import Navbar from "@/components/navbar/Navbar";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Providers from "@/components/Providers";

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
      <body className={font.className}>
        <Providers>
          <Navbar currentUser={currentUser} />
          <main className="pb-20 md:pt-28 pt-24">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
