import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Ostyn — Premium tuinconstructies op maat. Sinds 1992.",
    description:
        "Poolhouses, tuinhuizen, carports, garages, veranda's en pergola's. Ontworpen, in eigen atelier gebouwd en geplaatst door onze eigen teams. Eén partner van A tot Z. Familiebedrijf in Dottenijs, sinds 1992.",
};

export const viewport: Viewport = {
    themeColor: "#c19848",
    colorScheme: "light",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="nl" suppressHydrationWarning>
            <body className={cx(inter.variable, "bg-primary antialiased")}>
                <RouteProvider>
                    <Theme>{children}</Theme>
                </RouteProvider>
            </body>
        </html>
    );
}
