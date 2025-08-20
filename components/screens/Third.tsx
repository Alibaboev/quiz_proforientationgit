import SellingCard from "@/components/card";

type ThirdScreenProps = {
    bundle: {
        heading: string,
        cardsText: { title: string, sub: string, icon: any }[]
    }
}

const ThirdScreen = ({bundle}: ThirdScreenProps) => {
    return (
        <section className="w-full bg-[#153060] flex flex-col items-center pt-10 pb-14">
            <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold relative pb-10">
                { bundle.heading }
            </h1>

            <div className={"grid sm:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-4 w-full px-6 max-w-[1280px]"}>
                {
                    bundle.cardsText.map((c) =>
                        <SellingCard key={c.title}
                                     title={c.title}
                                     sub={c.sub}
                                     icon={c.icon}
                        />)
                }
            </div>
        </section>
    );
};

export default ThirdScreen;