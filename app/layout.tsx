import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/themeToggleButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const DMSans = DM_Sans({
  weight: "400",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${DMSans.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <ModeToggle />

          {children}

        </ThemeProvider>
        
      </body>
    </html>
  );
}
