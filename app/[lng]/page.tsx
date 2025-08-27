"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { getDictionary } from "@/dictionaries/dictionaries";

import { StartScreen } from "@/components/quiz/StartScreen";
import { RoleSelection } from "@/components/quiz/RoleSelection";
import { EducationLevelSelection } from "@/components/quiz/EducationLevelSelection";
import { PersonalizationScreen } from "@/components/quiz/PersonalizationScreen";
import { QuizScreen } from "@/components/quiz/QuizScreen";
import { LeadCaptureForm } from "@/components/quiz/LeadCaptureForm";
import { ThankYouScreen } from "@/components/quiz/ThankYouScreen";

type QuizPageProps = {
    params: { lng: string };
};

type Step =
    | "start"
    | "role"
    | "education"
    | "personalization"
    | "quiz"
    | "form"
    | "thankyou";

export default function QuizPage({ params: { lng } }: QuizPageProps) {
    const { bundle, currentLang } = getDictionary(lng);

    const [step, setStep] = useState<Step>("start");
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [educationLevel, setEducationLevel] = useState<string | null>(null);
    const [answers, setAnswers] = useState<any[]>([]);

    const handleStart = () => setStep("role");

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
        setStep("education");
    };

    const handleEducationSelect = (level: string) => {
        setEducationLevel(level);
        setStep("personalization");
        setTimeout(() => setStep("quiz"), 1000);
    };

    const handleQuizComplete = (quizAnswers: any[]) => {
        setAnswers(quizAnswers);
        setStep("form");
    };

    const handleFormSubmit = (data: { name: string; email: string }) => {
        console.log("SUBMIT", {
            ...data,
            role: selectedRole,
            level: educationLevel,
            answers,
        });
        setStep("thankyou");
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col">
                <Navbar
                    bundle={bundle.navbar}
                    lang={currentLang}
                    modalBundle={bundle.modalForm}
                    button={bundle.first.button}
                    isMultilang={true}
                />
                
                <div className="flex flex-1 items-center justify-center px-4">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-200 text-center">
                        {step === "start" && <StartScreen onStart={handleStart} />}
                        {step === "role" && <RoleSelection onSelect={handleRoleSelect} />}
                        {step === "education" && selectedRole && (
                            <EducationLevelSelection
                                role={selectedRole}
                                onSelect={handleEducationSelect}
                            />
                        )}
                        {step === "personalization" && <PersonalizationScreen />}
                        {step === "quiz" && selectedRole && educationLevel && (
                            <QuizScreen
                                role={selectedRole}
                                educationLevel={educationLevel}
                                onComplete={handleQuizComplete}
                            />
                        )}
                        {step === "form" && <LeadCaptureForm onSubmit={handleFormSubmit} />}
                        {step === "thankyou" && <ThankYouScreen />}
                    </div>
                </div>
            </main>

            <Footer bundle={bundle.footer} />
        </div>


    );
}
