'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./redux/providers";



// import bootstrap file -
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
       <Header></Header>
        {children}
        <Footer></Footer>
        </Providers>
        
        
        </body>
    </html>
  );
}
