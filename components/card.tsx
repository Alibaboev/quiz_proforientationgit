import {Card} from "@nextui-org/card";
import Image from "next/image"

type Props = {
    title: string,
    sub: string,
    icon: any
}


// return <Card className="px-5 py-3 bg-[#214C9766] border-slate-400">
export default function SellingCard({title, sub, icon}: Props) {
    return <Card className={"px-5 py-3 gradientBorderFix "}>
            <Image
                className={"py-2"}
                src={icon}
                alt={"icon"}
            />

            <h5 className={"text-white font-bold sm:text-medium lg:text-base"}>{title}</h5>
            <p className={"text-white text-sm"}>{sub}</p>
    </Card>
}