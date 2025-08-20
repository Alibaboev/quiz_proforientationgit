import * as fbpixel from "@/integrations/fbpixel";
import * as ttqpixel from "@/integrations/tiktokpixel";
import * as googlepixel from "@/integrations/google";
import {fbqTrackingPlaces} from "@/integrations/fbpixel";

const tempRemapForFacebook : Record<string, fbqTrackingPlaces>= {
    "form_submit": "landing",
    "form_submit_orientation": "orientation"
}

export function analyticsMainFormSubmitReport(place: string) {
    fbpixel.formSubmit(tempRemapForFacebook[place]);
    ttqpixel.formSubmit();
    googlepixel.formSubmit(place);
}

