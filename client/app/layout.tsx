import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NVD-CVE",
  description: "List of NVD-CVEs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
