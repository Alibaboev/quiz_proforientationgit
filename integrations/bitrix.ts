import "server-only";
import Bitrix from "@2bad/bitrix";

export const bitrix = Bitrix(process.env.SEND_LEADS || "");

export type UTMArguments = {
    source: string,
    medium: string,
    campaign: string,
    content: string,
    term: string,
}

export  type LeadInfo = {
    email: string,
    name: string,
    phone: string,
    comment: string
}
export const sendToBitrix = async (title: string, {email, name, phone, comment}: LeadInfo, utm: UTMArguments) => {
    console.log(`Creating BITRIX24 lead. With title: ${title}`)

    const response = await bitrix.leads.create({
        TITLE: title,
        NAME: name,
        HAS_PHONE: "Y",
        HAS_EMAIL: "Y",
        // @ts-ignore
        PHONE: [{VALUE_TYPE: "WORK", VALUE: phone}],
        // @ts-ignore
        EMAIL: [{VALUE_TYPE: "WORK", VALUE: email}],
        COMMENTS: comment,
        UTM_SOURCE: utm.source,
        UTM_MEDIUM: utm.medium,
        UTM_CAMPAIGN: utm.campaign,
        UTM_CONTENT: utm.content,
        UTM_TERM: utm.term
    });

    console.log("BITRIX24 response: ", response);
}


