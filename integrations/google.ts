export const pageview = () => {
    (window as any).dataLayer.push({event: "page_view"});
};

export const webinarPageView = () => {
    (window as any).dataLayer.push({event: "webinar_page_view"})
}

export const formSubmit = (place: string) => {
    (window as any).dataLayer.push({event: place});
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (arg: any) => {
    (window as any).dataLayer.push(arg);
};
