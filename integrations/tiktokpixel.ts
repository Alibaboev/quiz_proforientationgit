export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || ""

export const pageview = (content: string) => {
    (window as any).ttq.track("ViewContent", {content_id: content}, { event_id:  (window as any).crypto.randomUUID(), } );
};

export const formSubmit = () => {
    (window as any).ttq.track("SubmitForm",{}, { eventId: (window as any).crypto.randomUUID() });
}
