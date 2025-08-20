"use client"
import {usePathname} from "next/navigation";
import Script from "next/script";

export default function FormBitrix() {
   const path = usePathname();

   if(path == "/ru") {
      // eslint-disable-next-line @next/next/no-sync-scripts
      return <script data-b24-form="click/112/cf4in4" data-skip-moving="true" src={"/bitrixRU.js"}></script>
   }
   // eslint-disable-next-line @next/next/no-sync-scripts
   return <script data-b24-form="click/114/ax87ra" data-skip-moving="true" src={"/bitrixUA.js"}></script>
}