import React from 'react';
import Slider from "@/components/slider";
import {SliderCardInfo} from "@/types";

type SeventhScreenProps = {
    bundle: {
        heading: string,
        sliderCards: SliderCardInfo[]
    }
}
const SeventhScreen = ({bundle} : SeventhScreenProps) => {
    return (
            <section className="w-full flex flex-col items-center pt-10 pb-14">
                <h1 className="px-1 text-center text-blue-950 text-xl md:text-2xl lg:text-3xl font-bold relative pb-4">
                    {bundle.heading}
                </h1>

                <div className={"w-full sm:px-6 max-w-[1280px]"}>
                    <Slider sliderCards={bundle.sliderCards}/>
                </div>

            </section>
    );
};

export default SeventhScreen;