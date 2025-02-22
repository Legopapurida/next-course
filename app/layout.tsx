import type { Metadata } from "next";
import localFont from "next/font/local";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import NavBar from "./NavBar";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  openGraph: {
    title: "...",
    description: "...",
  },
};
const poppins = localFont({
  src: "../public/fonts/poppins-regular-webfont.woff2",
  variable: "--font-poppins",
});
// const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="winter">
      <body className={poppins.variable}>
        <AuthProvider>
          <NavBar />
          <main className="p-5">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
