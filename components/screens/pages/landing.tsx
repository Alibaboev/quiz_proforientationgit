import React from 'react';
import FirstScreen from "@/components/screens/First";
import SecondScreen from "@/components/screens/Second";
import ThirdScreen from "@/components/screens/Third";
import FourthScreen from "@/components/screens/Fourth";
import FifthScreen from "@/components/screens/Fifth";
import SixScreen from "@/components/screens/Six";
import SeventhScreen from "@/components/screens/Seventh";
import {LandingContent} from "@/types";

type Landing = {
    lang: LandingContent
}

const Landing = ({lang}: Landing) => {
    return (
        <>
            <FirstScreen bundle={lang.first} modalForm={lang.modalForm}/>
            <SecondScreen bundle={lang.second}/>
            <ThirdScreen bundle={lang.third}/>
            {/*<FourthScreen bundle={lang.fourth}/>*/}
            <FifthScreen bundle={lang.fifth}/>
            <SixScreen bundle={lang.six} modalForm={lang.modalForm}/>
            <SeventhScreen bundle={lang.seventh}/>
        </>
    );
};

export default Landing;