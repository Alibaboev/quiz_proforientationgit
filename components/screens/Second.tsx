type SecondScreenProps = {
    bundle : {
        heading: string
        subheadings : {
            first: string,
            second: string,
            third: string
        }
    }
}
const SecondScreen = ({bundle} : SecondScreenProps) => {
    return (
        <section className="flex flex-col items-center py-14 ">
            <div className="w-full px-6 max-w-[1280px] flex flex-col lg:items-center">
                <h1 className="text-center text-xl md:text-2xl lg:text-3xl text-blue-950 font-bold relative pb-4 ">
                    {bundle.heading}
                </h1>

                <h3 className="relative font-light text-lg md:text-2xl py-3">
                    {bundle.subheadings.first}
                </h3>

                <h3 className="relative font-light text-lg md:text-2xl py-3">
                    {bundle.subheadings.second}
                </h3>

                <h3 className="relative font-light text-lg md:text-2xl py-3">
                    {bundle.subheadings.third}
                </h3>
            </div>
        </section>
    );
};

export default SecondScreen;