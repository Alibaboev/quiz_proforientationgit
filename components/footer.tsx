import React from 'react';
import {Logo} from "@/components/icons";
import Image from "next/image";
import email from "@/public/mail.svg";
import tel from "@/public/phone.svg";
import {siteConfig} from "@/config/site";

type FooterProps = {
    bundle: {
        moto: string,
    }
}

const Footer = ({bundle}: FooterProps) => {
    return (
        <footer className="bg-[#153060] w-full flex flex-col items-center py-10">
            <div className="w-full px-6 max-w-[1280px] h-[200px]">
                <div>
                    <Logo/>
                    <p className="text-gray-400 py-3" dangerouslySetInnerHTML={{
                        __html: bundle.moto.replace(/\n/g, "<br />")
                    }}></p>

                    <div className="py-4">

                        <div className={"flex flex-row items-center pb-2"}>
                            <Image src={email} alt={""} className={"mr-2"}/>
                            <a className="text-gray-400" href={`mailto:${siteConfig.contacts.email}`}>
                                {siteConfig.contacts.email}
                            </a>
                        </div>

                        <div className={"flex items-center"}>
                            <Image src={tel} alt={""} className={"mr-2"}/>
                            <a className={"text-gray-400"} href={"tel:" + siteConfig.contacts.telcz.split(" ").join("")}>
                                {siteConfig.contacts.telcz}
                            </a>
                        </div>

                        <div className={"flex items-center"}>
                            <Image src={tel} alt={""} className={"mr-2"}/>
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