"use client"
import {useRouter} from "next/navigation";
import {Select, SelectItem} from "@nextui-org/select";
import {acceptedLanguages} from "@/components/data";
import {useState} from "react";

type LanguageSwitchProps = {
    lang: string
}
const LanguageSwitch = ({lang}: LanguageSwitchProps) => {
    const router = useRouter();
    const [value, setValue] = useState(lang.toUpperCase())

    return (
        <Select
            size={"sm"}
            radius={"sm"}
            variant={"bordered"}
            aria-label={"Language selection"}
            isRequired={true}
            selectionMode={"single"}
            className={"text-white mx-2"}
            color={"danger"}
            classNames={{
                value: "text-white",
                description: "text-white",
                popoverContent: "text-white bg-[#153060]",
                selectorIcon: "w-7 h-7",
                trigger: "w-[74px] text-white bg-[#153060] hover:none border-none",
            }}
            selectedKeys={[value]}
            onChange={(elem) => {
                const selection = elem.target.value;
                if(selection !== "") {
                    setValue(selection.toUpperCase())
                    router.push("/" + selection.toLowerCase())
                    router.refresh()
                }
            }}
        >
            {
                acceptedLanguages.map(l => l.toUpperCase()).map(language => (
                    <SelectItem key={language} value={language} aria-label={language}>
                        {language}
                    </SelectItem>
                ))
            }
        </Select>
    )
};

export default LanguageSwitch;