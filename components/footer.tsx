import React from 'react';
import { Logo } from "@/components/icons";
import Image from "next/image";
import NextLink from "next/link";
import email from "@/public/mail.svg";
import tel from "@/public/phone.svg";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("footer");

    return (
        <footer className="bg-[#153060] w-full flex flex-col items-center py-10">
            <div className="w-full px-6 max-w-[1280px] h-[200px]">
                <div>
                    <NextLink className="flex justify-start items-center gap-1" href="https://www.medstudy.cz/">
                        <Logo />
                    </NextLink>
                    <p
                        className="text-gray-400 py-3"
                        dangerouslySetInnerHTML={{
                            __html: t("moto").replace(/\n/g, "<br />"),
                        }}
                    ></p>

                    <div className="py-4">

                        <div className={"flex flex-row items-center pb-2"}>
                            <Image src={email} alt={""} className={"mr-2"} />
                            <a className="text-gray-400" href={`mailto:${siteConfig.contacts.email}`}>
                                {siteConfig.contacts.email}
                            </a>
                        </div>

                        <div className={"flex items-center"}>
                            <Image src={tel} alt={""} className={"mr-2"} />
                            <a className={"text-gray-400"} href={"tel:" + siteConfig.contacts.telcz.split(" ").join("")}>
                                {siteConfig.contacts.telcz}
                            </a>
                        </div>

                        <div className={"flex items-center"}>
                            <Image src={tel} alt={""} className={"mr-2"} />
                            <a className={"text-gray-400"} href={"tel:" + siteConfig.contacts.teluk.split(" ").join("")}>
                                {siteConfig.contacts.teluk}
                            </a>
                        </div>

                    </div>
                </div>
                <div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;