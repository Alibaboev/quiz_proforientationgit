"use client";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { StartScreen } from "@/components/quiz/StartScreen";
import { RoleSelection } from "@/components/quiz/RoleSelection";
import { EducationLevelSelection } from "@/components/quiz/EducationLevelSelection";
import { PersonalizationScreen } from "@/components/quiz/PersonalizationScreen";
import { QuizScreen } from "@/components/quiz/QuizScreen";
import { LeadCaptureForm } from "@/components/quiz/LeadCaptureForm";
import { ThankYouScreen } from "@/components/quiz/ThankYouScreen";
import { useQuiz } from "@/context/QuizContext";

export default function QuizPage() {
  const { step, setStep, role, level, setAnswers, answers } = useQuiz();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-200 text-center">
            {step === "start" && <StartScreen onStart={() => setStep("role")} />}
            {step === "role" && <RoleSelection />}
            {step === "education" && role && <EducationLevelSelection/>}
            {step === "personalization" && <PersonalizationScreen />}
            {step === "quiz" && role && level && <QuizScreen />}
            {step === "form" && <LeadCaptureForm onSubmit={(data) => {
              setAnswers([...answers, { question: "Form submitted", answer: JSON.stringify(data) }]);
              setStep("thankyou");
            }} />}
            {step === "thankyou" && <ThankYouScreen />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
