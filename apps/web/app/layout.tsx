import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rave | Rave - Personalized AI Learning Roadmaps",
  description:
    "Get started to Rave to create and manage your personalized AI learning journeys",
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
