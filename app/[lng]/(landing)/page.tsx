import {Navbar} from "@/components/navbar";
import Footer from "@/components/footer";
import {getDictionary} from "@/dictionaries/dictionaries";
import Landing from "@/components/screens/pages/landing";
import PopUps from "@/components/thanks";
import {Suspense} from "react";


type LandingPageProps = {
    params: {lng: string},
    searchParams : {thanks: string}
}

export default function LandingPage({params: {lng}}: LandingPageProps) {
    const {bundle, currentLang} = getDictionary(lng);

    return (
        <div className="relative flex flex-col">
            <main className={"w-full"}>
                <Suspense fallback={<></>}>
                    <PopUps modalForm={bundle.modalForm}/>
                </Suspense>
                <Navbar
                    bundle={bundle.navbar}
                    lang={currentLang}
                    modalBundle={bundle.modalForm}
                    button={bundle.first.button}
                    isMultilang={true}
                />
                <Landing lang={bundle}/>
                <Footer bundle={bundle.footer}/>
            </main>
        </div>
    )
}