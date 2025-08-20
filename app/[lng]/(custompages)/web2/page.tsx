"use client"
import "@/public/webinar/style.css"
import FacebookPixel from "@/components/FacebookPixel";
import * as fbpix from "@/integrations/fbpixel"
import * as gtmpix from "@/integrations/google"
import {useRouter} from "next/navigation";
export default function WebinarTelegramPage() {
    const router = useRouter();

    return <main id={"main-webinar"}>
        <div id="eng"
        >
            <div id="card"
                 // style={{marginTop: "-250px"}}
            >
                <a id="photo" href="https://t.me/medstudyczbot"
                   onClick={() => {
                       fbpix.formSubmit("web2")
                       gtmpix.formSubmit("webinar_landing")
                   }}
                > </a>
                <div id="chanel_name">
                <span>
                    MEDSTUDY
                </span>
                    <span
                        id={"subheader"}
                        style={{fontSize: 15+"px", fontWeight:"lighter", lineHeight: "30px", textAlign: "center"}}
                    >
                    992 subscribers
                </span>
                </div>

                <div id="channel_description">
                    Реєструйся на наш вербінар та отримай гайд по гарантованому вступу до ВНЗ Європи!
                    <br/>
                    Підписуйся! ⤵️
                </div>

                <a className="shine" id="button_join" href="/"
                   onClick={(e) => {
                       e.preventDefault();
                       fbpix.formSubmit("web2")
                       gtmpix.formSubmit("webinar_form_submit")
                       router.push("https://t.me/medstudyczbot")
                   }}
                   // onClick="fbq('track', 'Lead');"
                >
                    <span>Отримати гайд</span>
                </a>
            </div>
        </div>
        <FacebookPixel ids={["268076376033266"]}/>
    </main>
}