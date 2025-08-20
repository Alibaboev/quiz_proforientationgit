import Image from "next/image";

type FourthScreenProps = {
    bundle : {
        heading: string,
        subheading: string,
        uniLogos: any[]
    }
}

const FourthScreen = ({bundle} : FourthScreenProps) => {
    return (
        <section className="w-full flex flex-col items-center pt-10 pb-10 lg:pb-14">
            <div className={"text-center w-full px-6 max-w-[1280px] flex flex-col items-center"}>

                <h1 className="lg:w-3/6 text-blue-950 text-xl md:text-2xl lg:text-3xl font-bold relative pb-4 lg:pb-10">
                    {bundle.heading}
                </h1>
                {/*<h2 className="font-light text-lg md:text-2xl pb-9 lg:pt-2 lg:pb-16">*/}
                {/*    {bundle.subheading}*/}
                {/*</h2>*/}

                <div className={"grid grid-cols-3 gap-4 place-items-center lg:w-4/5"}>
                    {
                        bundle.uniLogos.map((logo, i) =>
                            <Image
                                key={i}
                                src={logo}
                                className="object-center object-cover pointer-events-none"
                                alt={"logo"}
                            />
                        )
                    }
                </div>

            </div>

        </section>
    );
};

export default FourthScreen;