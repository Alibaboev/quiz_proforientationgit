"use client"
import React, {useState} from 'react';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure, Checkbox, CircularProgress,
} from "@nextui-org/react";

import {Input} from "@nextui-org/input";

import 'react-international-phone/style.css';
import {CountrySelector, usePhoneInput} from "react-international-phone";
import done from "@/public/done.svg"
import axios from "axios";
import Image from "next/image";
import {analyticsMainFormSubmitReport} from "@/integrations/utils";
import {useSearchParams} from "next/navigation";

type ContactModal = {
    buttonText: string,
    bundle: {
        heading: string,
        fields: Record<string, string>,
        checkbox: string,
        button: string
        thanks: {
            heading: string,
            subheading: string
        }
    }
}

type RequestState = {
    state: "init" | "pending" | "error" | "done",
    message?: string
}


const ContactModal = ({buttonText, bundle}: ContactModal) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const params = useSearchParams();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [isAccepted, setIsAccepted] = useState(true);

    const [request, setState] = useState<RequestState>({ state: "init" });

    const phoneInput = usePhoneInput({
        defaultCountry: "ua",
        value: phone,
        onChange: (data) => {
            setPhone(data.phone);
        }
    });

    function sendData() {
        setState({state: "pending"})


        axios.post("/api/lead", {
            name, phone, email, country: phoneInput.country,
            utm: {
                source: params.get("utm_source"),
                medium: params.get("utm_medium"),
                campaign: params.get("utm_campaign"),
                content: params.get("utm_content"),
                term: params.get("utm_term"),
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    analyticsMainFormSubmitReport("form_submit")
                    setState({state: "done"})
                } else {
                    setState({state: "error", message: res.data?.message})
                }
            })
            .catch(_ => {
                setState({state: "error", message: "Validation error. Please check that your info is correct."})
            })
    }

    return (
        <>
            <Button onPress={onOpen} variant={"solid"} color={"primary"} radius={"sm"}
                    // className={"sm:w-2/3 bg-[#36B5FF] px-6 py-7"}>
                    className={"bg-[#36B5FF] px-6 py-7"}>
                <h3 className={"font-bold text-lg"}>{buttonText}</h3>
            </Button>

            <Modal isOpen={isOpen} size={"3xl"}
                   onOpenChange={onOpenChange}
                   className={"md:pb-16 md:pt-14 md:px-20"}
                   onClose={
                       () => { setState({state: "init"}) }
                   }
            >
                {
                    request.state == "done" ?
                        <ModalContent>
                            <ModalBody className={"w-full flex flex-col items-center py-10 "}>
                                <Image width={120} height={120} src={done} alt={"Form is send"}/>
                                <h1 className="text-center text-blue-950 text-lg sm:text-3xl font-bold relative sm:leading-10 sm:tracking-wide">
                                    {bundle.thanks.heading}
                                </h1>
                                <p className={"text-center sm:text-xl"}>
                                    {bundle.thanks.subheading}
                                </p>
                            </ModalBody>
                        </ModalContent>
                        :
                        <ModalContent>
                            {(_) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 md:pb-10">
                                        <h1 className="text-center text-blue-950 text-3xl font-bold relative sm:leading-10 sm:tracking-wide">
                                            {bundle.heading}
                                        </h1>

                                    </ModalHeader>
                                    <ModalBody>
                                        <Input type={"text"}
                                               autoFocus
                                               size={"lg"}
                                               label={bundle.fields.first}
                                               variant={"bordered"}
                                               placeholder={""}
                                               value={name}
                                               onChange={e => setName(e.target.value)}
                                        />

                                        <div className={"flex flex-row items-center relative"}>

                                            <Input type={"tel"}
                                                   startContent={
                                                       <CountrySelector
                                                           className={"relative"}
                                                           dropdownStyleProps={{
                                                               className: "rounded-xl h-36 ",
                                                               style: {zIndex: 20}
                                                           }}
                                                           buttonStyle={{border: "none"}}
                                                           selectedCountry={phoneInput.country.iso2}
                                                           onSelect={(country) => phoneInput.setCountry(country.iso2)}
                                                       />
                                                   }
                                                   variant={"bordered"}
                                                   size={"lg"}
                                                   placeholder={bundle.fields.second}
                                                   value={phoneInput.phone}
                                                   onChange={phoneInput.handlePhoneValueChange}
                                                   ref={phoneInput.inputRef}
                                            />
                                        </div>

                                        <Input type={"email"}
                                               label={bundle.fields.third}
                                               size={"lg"}
                                               variant={"bordered"}
                                               placeholder={""}
                                               value={email}
                                               onChange={e => setEmail(e.target.value)}
                                        />

                                        <Checkbox isSelected={isAccepted} onValueChange={setIsAccepted}
                                                  isRequired={true} color={"warning"}
                                                  className={"py-3 flex items-center"}>
                                            <p className={"text-xs md:text-medium text-gray-500" + (isAccepted ? "" : "text-xl")}>
                                                {bundle.checkbox}
                                            </p>
                                        </Checkbox>

                                        {
                                            request.state == "error" && <div className={"w-full p-3 bg-red-300 border-l-4 border-l-red-700"}>
                                                <p className={"font-semibold"}>{request.message}</p>
                                            </div>
                                        }

                                    </ModalBody>
                                    <ModalFooter className={"md:pt-10 md:flex md:justify-center"}>
                                        <Button isDisabled={!isAccepted} onPress={onOpen} variant={"solid"}
                                                color={"primary"}
                                                radius={"sm"}
                                                onClick={() => sendData()}
                                                className={"w-full md:w-1/2 bg-[#36B5FF] px-6 py-7"}>
                                            {
                                                request.state == "pending" ?
                                                    <CircularProgress aria-label={"Sending form"}/> :
                                                    <h3 className={"font-bold text-lg"}>{bundle.button}</h3>
                                            }
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                }
            </Modal>
        </>
    );
};

export default ContactModal;