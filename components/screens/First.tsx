import Image from "next/image";
import hero from "@/public/hero main.jpg";
import ContactModal from "@/components/contactmodal";
import {Suspense} from "react";

type FirstScreen = {
    bundle: {
        heading: string,
        subheading: string,
        button: string
    },
    modalForm: any
}
export default function FirstScreen({bundle: {heading, subheading, button}, modalForm} : FirstScreen) {

    return <section
        className="w-screen aspect-square sm:aspect-[3/2] lg:aspect-[5/2] relative flex items-center justify-center overflow-hidden ">
        <Image
            src={hero}
            className="-translate-x-[20px] -translate-y-1/4 sm:-translate-x-1/4 scale-150 object-right-bottom object-cover pointer-events-none lg:transform-none"
            layout={"fill"}
            alt={"students"}
        />
        <div className={"lg:w-full relative px-6 max-w-[1280px] h-full"}>
            <div
                className={"w-full lg:w-2/5 text-center lg:text-left flex flex-col justify-between lg:justify-center items-center lg:items-start h-full py-5 sm:py-8 overflow-hidden"}>
                <div>
                    <h1 className="text-blue-950 text-2xl sm:text-3xl md:text-4xl font-bold relative sm:leading-10 sm:tracking-wide">
                        {heading}
                    </h1>
                    <h2 className="hidden lg:block relative text-xl lg:text-2xl pt-1 sm:pt-3 lg:pt-6 pb-14 font-light">
                        {subheading}
                    </h2>
                </div>
                <Suspense fallback={<></>}>
                    <ContactModal buttonText={button} bundle={modalForm}/>
                </Suspense>
            </div>
        </div>
    </section>
}