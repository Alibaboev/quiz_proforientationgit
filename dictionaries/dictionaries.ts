import {textRU} from "@/dictionaries/ru";
import {orientationUAText, textUA, WebinarUAText} from "@/dictionaries/ua";
import {LandingContent} from "@/types";



const dictionary : Record<string, {bundle: LandingContent, currentLang: string}> = {
    "ru" : { "bundle": textRU, "currentLang": "ru"},
    "ua" : { "bundle": textUA, "currentLang": "ua"},
};

export const getDictionary = (locale: string) => dictionary[locale] || dictionary["ru"]

export const getOrientationDictionary = (locale: string): {
    bundle: typeof orientationUAText, currentLang: string
} => ({"bundle" : orientationUAText, "currentLang" : "ua"})

export const getWebinarDictionary = (locale: string): {
    bundle: typeof orientationUAText, currentLang: string
} => ({"bundle": WebinarUAText, "currentLang" : "ua"})