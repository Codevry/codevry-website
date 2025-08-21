import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { getBaseUrl } from "@/app/utils/functions";

const lexendDeca = Lexend_Deca({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Codevry",
    metadataBase: new URL(getBaseUrl()),
    description: "Building Open-Source Tools, Services & Applications",
    openGraph: {
        images: "/opengraph-image.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${lexendDeca.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
