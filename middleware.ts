import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import {NextRequest} from "next/server";

const locales = ['en', 'ru', 'ua']
const defaultLang = "ru";

function getLocale(request: NextRequest) {
    const langHeader = "accept-language";
    const headers= {
        [langHeader]: request.headers.get(langHeader) || ""
    };

    let languages = new Negotiator({ headers: headers }).languages()

    return match(languages, locales, defaultLang);
}
// Get the preferred locale, similar to the above or using a library

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl

    if(pathname.endsWith('orientation')) {
        request.nextUrl.pathname = `/ua/orientation`
        return Response.redirect(request.nextUrl);
    }

    if(pathname.endsWith('webinar')) {
        request.nextUrl.pathname = `/ua/webinar`
        return Response.redirect(request.nextUrl);
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    let locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return Response.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        // '/((?!_next).*)',
        // Optional: only run on root (/) URL
        '/', '/orientation', "/webinar", "/web2"
    ],
}