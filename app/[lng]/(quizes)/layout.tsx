import {ChildComponent} from "@/types";
import {Navbar} from "@/components/navbar";
import {Suspense} from "react";
import {Spinner} from "@nextui-org/react";
import Footer from "@/components/footer";
import {getDictionary} from "@/dictionaries/dictionaries";

const UAQuizesLayout= ({children} : ChildComponent) => {
    const {bundle} = getDictionary("ua");

    return (
        <>
            <Navbar
                bundle={bundle.navbar}
                lang={"ua"}
                modalBundle={bundle.modalForm}
                button={bundle.first.button}
                isMultilang={false}
            />
            <main className={"flex flex-col justify-center items-center min-h-full"}>

                <Suspense fallback={
                    <div className={"h-full"}>
                        <Spinner size={"lg"}/>
                    </div>
                }>
                    {children}
                </Suspense>


            </main>
            <Footer bundle={bundle.footer}/>
        </>
    );
};

export default UAQuizesLayout;