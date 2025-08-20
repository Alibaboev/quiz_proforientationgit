import React, {Suspense} from 'react';
import ContactModal from "@/components/contactmodal";

type SixScreenProps = {
    bundle: {
        heading: string
        subheadings: {
            first: string,
            second: string,
            third: string
        }
        button: string
    },
    modalForm: any
};

const SixScreen = ({bundle, modalForm}: SixScreenProps) => {
    //bad, need to fix
    const uaVersion = bundle.subheadings.third == "";

    return (
        <section className="w-full bg-[#153060] flex flex-col items-center py-16">

            <div className="w-full px-6 max-w-[1280px] flex flex-col items-center">

                <h1 className="text-white text-center text-xl md:text-2xl lg:text-3xl font-bold relative pb-4 lg:pb-10">
                    {bundle.heading}
                </h1>

                <div>

                    <h3 className={`${uaVersion? "text-center" : ""} relative font-light text-lg md:text-2xl py-3 text-white` }>
                        {bundle.subheadings.first}
                    </h3>

                    <h3 dangerouslySetInnerHTML={{__html: bundle.subheadings.second}}
                        className={` ${uaVersion? 'text-center' : ''} relative font-light text-lg md:text-2xl py-3 text-white`}/>

                    {
                        !uaVersion &&
                        <h3 className="relative font-light text-lg md:text-2xl py-3 text-white">
                            {bundle.subheadings.third}
                        </h3>
                    }

                </div>

                <div className={"pt-7"}>
                    <Suspense fallback={<></>}>
                        <ContactModal buttonText={bundle.button} bundle={modalForm}/>
                    </Suspense>
                </div>
            </div>
        </section>

    );
};

export default SixScreen;