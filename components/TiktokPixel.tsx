"use client"
import React, {useEffect, useState} from 'react';
import Script from "next/script";
import {usePathname} from "next/navigation";
import * as pixel from "@/integrations/tiktokpixel"

type TiktokPixelProps = {
    id: string
}

const TiktokPixel = ({id} : TiktokPixelProps) => {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if(!loaded) return;

        pixel.pageview("main_landing")
    }, [pathname, loaded]);

    return (
        <Script
            id="tiktok-pixel"
            src="/tiktok.js"
            strategy="afterInteractive"
            onLoad={() => { setLoaded(true) }}
            data-pixel-id={id}
        />
    );
};

export default TiktokPixel;