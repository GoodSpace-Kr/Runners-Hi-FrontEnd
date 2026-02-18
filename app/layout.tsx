import type { Metadata } from "next";
import { ProgressBarProvider } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "RunnersHi",
  description: "러너스하이입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProgressBarProvider>{children}</ProgressBarProvider>
      </body>
    </html>
  );
}
