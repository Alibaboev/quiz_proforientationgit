import "@/styles/globals.css";
import {Metadata} from "next";
import {siteConfig} from "@/config/site";
import {fontSans} from "@/config/fonts";
import clsx from "clsx";
import {SpeedInsights} from "@vercel/speed-insights/next"
import {ChildComponent} from "@/types";
import FacebookPixel from "@/components/FacebookPixel";
import TiktokPixel from "@/components/TiktokPixel";
import {Analytics} from "@vercel/analytics/react";
import GoogleTagManager from "@/components/GoogleTagManager"
import {fbPixelsIds} from "@/integrations/fbpixel";
import {acceptedLanguages} from "@/components/data";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.webp",
    },
};

export async function generateStaticParams() {
    return acceptedLanguages.map(l => ({"lang": l}))
}

type RootLayoutParams = {
    params: { lng: string }
} & ChildComponent

export default function RootLayout({children, params}: RootLayoutParams) {
    const containerId = 'GTM-TXQ44C78'

    return (
        <html lang={params.lng}>
        <head/>
        <body className={clsx("min-h-screen flex flex-col bg-background font-sans antialiased", fontSans.className)}>
        {
            children
        }
        <FacebookPixel ids={fbPixelsIds}/>
        <TiktokPixel id={process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || ""}/>
        <GoogleTagManager containerId={containerId}/>

        <SpeedInsights/>
        <Analytics/>
        </body>
        </html>
    );
}
