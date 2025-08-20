import {SVGProps} from "react";
import {StaticImageData} from "next/image";
import {ReactNode} from "react";
import {textRU} from "@/dictionaries/ru";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type SliderCardInfo = {
    title: string,
    sub: string,
    description: string,
    img: StaticImageData
    linkName: string ,
    linkUrl: string
};

export type ChildComponent = {
    children: ReactNode
}

export type LandingContent = typeof textRU;
