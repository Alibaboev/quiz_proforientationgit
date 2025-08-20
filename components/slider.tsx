"use client"
import Carousel from "framer-motion-carousel";
import {Card} from "@nextui-org/card";
import Image from "next/image";
import {SliderCardInfo} from "@/types";

type SliderProps = {
    sliderCards: SliderCardInfo[]
}
export default function Slider({sliderCards}: SliderProps) {
    return <Carousel autoPlay={true} interval={15000} loop={true}>
        {
            sliderCards.map((item, i) =>
                <Card key={item.title} className={
                    "flex flex-col items-center lg:flex-row sm:p-5 mx-2 sm:mx-32 mt-5 mb-14  sm:my-12 lg:p-10 lg:my-14 lg:mx-32"
                }>
                    <Image src={item.img} alt={"img"} className={"rounded-full sm:w-60 sm:h-60 m-3 lg:m-5"}/>
                    <div className={"mx-5 lg:mx-10 my-3"}>
                        <h1 className="text-blue-950 text-xl lg:text-3xl font-bold relative">
                            {item.title}
                        </h1>
                        <h1 className="text-blue-950 text-xl lg:text-2xl font-bold relative pb-i0">
                            {item.sub}
                        </h1>
                        <h2 className="relative font-light sm:text-lg lg:text-2xl py-2 lg:py-5">
                            {item.description}
                        </h2>
                        <div className={"w-full text-center md:text-left my-2 text-lg"}>
                            <a href={item.linkUrl} target={"_blank"} className={"text-[#36B5FF] border-b border-b-[#36B5FF]"}>
                                {item.linkName}
                            </a>
                        </div>
                    </div>
                </Card>
            )
        }
    </Carousel>
}