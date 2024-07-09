import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { trTR } from "@clerk/localizations";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Mutlu Cocuk Tasarimi",
  description: "Created by Salah Yudin",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={trTR}>
      <html lang="tr">
        <body className={`font-sans ${inter.variable} overflow-y-scroll overflow-x-clip`}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
