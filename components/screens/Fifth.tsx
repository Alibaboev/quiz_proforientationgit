import Image from "next/image";
import hero2 from "@/public/hero second.jpg";

type FifthScreenProps = {
    bundle: { heading: string}
}

const FifthScreen = ({bundle} : FifthScreenProps) => {
    return (
        <section className={"w-full flex flex-col items-center lg:pt-10 lg:pb-14 "}>
            <div className="w-full lg:px-6 max-w-[1280px] lg:h-unit-8xl">
                <div
                    className={"flex px-6 aspect-square md:aspect-[3/2] lg:transform-none lg:p-0 flex-row justify-center lg:justify-end items-center w-full lg:h-full relative lg:rounded-lg overflow-hidden bg-blue-900"}>
                    <Image
                        src={hero2}
                        className="object-left-bottom scale-150 lg:transform-none -translate-y-1/4 translate-x-1/4 object-cover pointer-events-none"
                        layout={"fill"}
                        alt={"students"}
                    />
                    <div
                        className="w-full lg:w-6/12 h-full text-center lg:text-left flex flex-col items-center lg:items-start justify-between lg:justify-center lg:pr-10 lg:pl-8 py-2 lg:py-10">
                        <h2 className="relative sm:tracking-wide font-light text-2xl sm:text-4xl py-5 lg:py-2">
                            { bundle.heading }
                        </h2>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default FifthScreen;