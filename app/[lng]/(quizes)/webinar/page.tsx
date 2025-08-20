"use client"
import QuestionCard from "@/components/quiz/QuestionCard";
import {useEffect, useState} from "react";
import {getWebinarDictionary} from "@/dictionaries/dictionaries";
import Script from "next/script";
import FacebookPixel from "@/components/FacebookPixel";

const WebinarPage = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        (window as any).ssContext = {
            variables: { // Данные клиента
                utm_source: params.get("utm_source"),
                utm_medium: params.get("utm_medium"),
                utm_campaign: params.get("utm_campaign"),
                utm_content: params.get("utm_content"),
                utm_term: params.get("utm_term"),
            },
            scope: { // Внешние переменные

            },
            form: { // Значения по умолчанию внутри формы

            },
        };

    }, []);

    console.log(activeIndex);
    const nextCard = () => {
        setActiveIndex(activeIndex + 1)
    }

    const {bundle } = getWebinarDictionary("ua");

    const cardArray = bundle.map(card => (<QuestionCard key={card.id} cardData={card} clickHandler={nextCard}/>))



    return (
        <div className={"container flex flex-col items-center justify-center h-full"}>
            <div className={"py-4"}>
                {
                    activeIndex < bundle.length && cardArray[activeIndex]
                }
                <div id="vBOGyEUC" className={`${activeIndex < bundle.length? "opacity-0 h-0" : "opacity-100 h-full"} w-full ss-landing`} data-target="vBOGyEUC" data-domain="medstudyte"></div>

                <Script src="https://customer.smartsender.eu/js/client/lp.min.js?v2.0.0"
                        strategy={"afterInteractive"}
                />
            </div>

            <FacebookPixel ids={["1113887743389390"]}/>
        </div>
    );
};

export default WebinarPage;