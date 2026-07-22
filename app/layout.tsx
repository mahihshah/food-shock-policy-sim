import { Syne, Bricolage_Grotesque, Instrument_Serif, Lora } from "next/font/google";
 
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-syne" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const instrument = Instrument_Serif({ subsets: ["latin"], style: ["normal", "italic"], weight: "400", variable: "--font-instrument" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
     <html lang="en">
      <body className={`${syne.variable} ${bricolage.variable} ${instrument.variable} ${lora.variable}`}>
        {children}
      </body>
    </html>
  );
}