import {getDictionary, getOrientationDictionary} from "@/dictionaries/dictionaries";
import Board from "@/components/Board";


export default function OrientationPage() {
    const {bundle,} = getDictionary("ua");
    const {bundle: questionData, currentLang} = getOrientationDictionary("ua")

    return (
        <>
            <Board data={questionData} modal={bundle.modalForm}/>
        </>
    )
}