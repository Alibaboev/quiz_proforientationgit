"use client";
import React, {useEffect, useState} from 'react';
import {usePathname} from "next/navigation";
import Script from "next/script";
import * as pixel from "@/integrations/google"

interface GoogleTagManagerProps {
  containerId: string;
}


const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ containerId }) => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    if (!loaded) return;

    pixel.pageview()
  }, [pathname, loaded]);

  return (
      <div>
        <Script
            id="google-pixel"
            src="/google.js"
            strategy="afterInteractive"
            onLoad={() => {
              setLoaded(true)
            }}
            data-pixel-id={containerId}
        />
      </div>
  );
};

export default GoogleTagManager;
