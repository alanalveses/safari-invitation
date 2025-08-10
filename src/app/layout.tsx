import type { Metadata } from "next";
import { Geist, Geist_Mono, Chewy } from "next/font/google";
import "./globals.css";
const chewy = Chewy({ subsets: ["latin"], weight: "400" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Convite de Aniversário do Pedro",
  description:
    "Venha celebrar esse momento especial com a gente! Estou comemorando meu primeiro aninho.",
  openGraph: {
    title: "Convite de Aniversário do Pedro",
    description:
      "Venha celebrar esse momento especial com a gente! Estou comemorando meu primeiro aninho.",
      icons: {
          icon: '/favicon.ico',
        },
    url: "https://convite-safari.vercel.app/",
    images: [
      {
        url: "/images/cover.jpeg",
        width: 1200,
        height: 630,
        alt: "Imagem de fundo do convite",
        
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convite de Aniversário do Pedro",
    description:
      "Venha celebrar esse momento especial com a gente! Confirme sua presença no Chá de Fralda e Revelação.",
    images: ["https://cha-revelacao-manuellamarcos.vercel.app/bg.jpeg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${chewy.className} antialiased bg-blue-50 `}
      >
        {children}
      </body>
    </html>
  );
}
