
export type fbqTrackingPlaces = "landing" | "orientation" | "webinar" | "web2"

const fbPixelsMap : Record<fbqTrackingPlaces, string>= {
    "landing": "1530550204184837",
    "orientation" : "1717086008717774",
    "webinar" : "1113887743389390",
    "web2": "268076376033266"
}

export const fbPixelsIds = Object.values(fbPixelsMap)

export const pageview = (place: fbqTrackingPlaces) => {
    (window as any).fbq("trackSingle",fbPixelsMap[place], "PageView");
};

export const formSubmit = (place: fbqTrackingPlaces) => {
    (window as any).fbq("trackSingle", fbPixelsMap[place], "Lead");
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const eventToAllPixels = (name: string, options = {}) => {
    (window as any).fbq("track", name, options);
};