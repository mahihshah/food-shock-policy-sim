import { Syne, Bricolage_Grotesque, Instrument_Serif, Lora } from "next/font/google";
import { ThemeToggle } from "../ThemeToggle"; // adjust path to match your file structure
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-syne" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const instrument = Instrument_Serif({ subsets: ["latin"], style: ["normal", "italic"], weight: "400", variable: "--font-instrument" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* Prevents a light-mode flash on load before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('fss-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
      </head>
      <body className={`${syne.variable} ${bricolage.variable} ${instrument.variable} ${lora.variable}`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}