import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";

export const metadata = {
  title: "ROOTZ — Premium Modest Hijab Collection",
  description: "Authentic, Breathable & Luxury Hijabs in Bangladesh",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#FAF8F5] text-[#1E1E1E] antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}