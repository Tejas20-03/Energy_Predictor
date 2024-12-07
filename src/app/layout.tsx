import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import connectDB from "@/lib/db";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "RE4Climate Energy Predictor",
  description: "Get your quote on the go",
  icons: {
    icon: "/assets/logo.png",
  },
};

connectDB();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
