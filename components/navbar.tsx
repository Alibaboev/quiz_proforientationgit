"use client"
import {Suspense, useState} from "react";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem, NavbarMenu, NavbarMenuItem,
} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";
import {siteConfig} from "@/config/site";
import NextLink from "next/link";


import {Logo} from "@/components/icons";
import {CiInstagram} from "react-icons/ci";
import {CiYoutube} from "react-icons/ci";
import {PiTiktokLogoLight} from "react-icons/pi";
import LanguageSwitch from "@/components/languageSwitch";
import ContactModal from "@/components/contactmodal";
import {AiFillInstagram, AiFillYoutube} from "react-icons/ai";
import {RiTiktokFill} from "react-icons/ri";

type NavbarProps = {
    bundle: { lang: string },
    lang: string,
    modalBundle: any,
    button: string
    isMultilang: boolean
}


export const Navbar = ({bundle, lang, modalBundle, button, isMultilang}: NavbarProps) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <NextUINavbar onMenuOpenChange={setMenuOpen}
                      shouldHideOnScroll={true}
                      position={"sticky"}
                      maxWidth="xl"
                      className={"bg-[#153060]"}
        >

            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href={"/" + bundle.lang}>
                        <Logo/>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="lg:hidden text-white"
            />

            <NavbarMenu className="py-5 h-full">

                { isMultilang &&
                    <NavbarItem>
                        <div className={"flex flex-row justify-around items-center pb-5 text-[#184C99]"}>
                            <Link href={"/ua"}>
                                <p className={"block text-xl font-bold p-2 " + (bundle.lang == "ua" && "border-b-4 border-[#184C99]")}>UA</p>
                            </Link>
                            <Link href={"/ru"}>
                                <p className={"block text-xl font-bold p-2 " + (bundle.lang == "ru" && "border-b-4 border-[#184C99]")}>RU</p>
                            </Link>
                        </div>
                    </NavbarItem>
                }

                <div className={"h-full flex flex-col justify-between items-center"}>

                    <div className="text-center flex flex-col justify-center text-[#184C99] pb-5 grow">
                        <NavbarMenuItem className={"mb-5"}>
                            <a href={"tel:" + siteConfig.contacts.telcz.split(" ").join("")}>
                                <p className="text-3xl ">
                                    {siteConfig.contacts.telcz}
                                </p>
                            </a>
                        </NavbarMenuItem>

                        <NavbarMenuItem className={"mb-5"}>
                            <a href={"tel:" + siteConfig.contacts.teluk.split(" ").join("")}>
                                <p className="text-3xl ">
                                    {siteConfig.contacts.teluk}
                                </p>
                            </a>
                        </NavbarMenuItem>

                        <NavbarMenuItem className={""}>
                            <a href={"mailto:" + siteConfig.contacts.email}>
                                <p className="text-3xl ">
                                    {siteConfig.contacts.email}
                                </p>
                            </a>
                        </NavbarMenuItem>
                    </div>

                    <div className={"items-center "}>
                        <Suspense fallback={<></>}>
                            <ContactModal buttonText={button} bundle={modalBundle}/>
                        </Suspense>

                        <NavbarMenuItem className={"w-full flex items-center justify-center py-10"}>
                            <Link isExternal href={siteConfig.links.inst} aria-label="Instagram">
                                <AiFillInstagram className={"w-12 h-12 mx-3 text-[#184C99]"}/>
                            </Link>
                            <Link isExternal href={siteConfig.links.youtube} aria-label="Youtube">
                                <AiFillYoutube className={"w-12 h-12 mx-3 text-[#184C99]"}/>
                            </Link>
                            <Link isExternal href={siteConfig.links.tiktok} aria-label="Tiktok">
                                <RiTiktokFill className={"w-12 h-12 mx-3 text-[#184C99]"}/>
                            </Link>
                        </NavbarMenuItem>
                    </div>
                </div>

            </NavbarMenu>

            <NavbarContent
                className="hidden lg:flex sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden lg:flex gap-2">
                    <div className="flex items-center justify-center">
                        <Link isExternal href={siteConfig.links.inst} aria-label="Instagram">
                            <CiInstagram className={"w-7 h-7 text-white mx-0.5"}/>
                        </Link>
                        <Link isExternal href={siteConfig.links.youtube} aria-label="Youtube">
                            <CiYoutube className={"w-7 h-7 text-white mx-0.5"}/>
                        </Link>
                        <Link isExternal href={siteConfig.links.tiktok} aria-label="Tiktok">
                            <PiTiktokLogoLight className={"w-7 h-7 text-white mx-0.5"}/>
                        </Link>

                        <a className="text-white ml-7" href={`tel:${siteConfig.contacts.telcz.split(" ").join("")}`}>
                                <p className="text-white">
                                    {siteConfig.contacts.telcz}
                                </p>
                        </a>

                        <a className="text-white ml-7" href={"tel:" + siteConfig.contacts.teluk.split(" ").join("")}>
                                <p className="text-white">
                                    {siteConfig.contacts.teluk}
                                </p>
                        </a>

                        {
                            isMultilang && <LanguageSwitch lang={lang}/>
                        }
                    </div>
                </NavbarItem>
            </NavbarContent>

        </NextUINavbar>
    );
};
