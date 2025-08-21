// /components/proforientation/ProforientationClient.tsx
'use client';

import React, { useState } from 'react';
import { Button, Card, CardBody, Progress, Input, Spinner, Textarea } from '@nextui-org/react';

// --- Типы данных ---
// Определяем структуру нашего словаря для TypeScript
interface QuizDictionary {
  questions: any;
  prompts: any;
  startTitle: string;
  startSubtitle: string;
  startButton: string;
  roleSelectTitle: string;
  studentButton: string;
  parentButton: string;
  educationSelectTitle: string;
  langSelectTitle: string;
  formTitle: string;
  formSubtitle: string;
  formButton: string;
  thankYouTitle: string;
  thankYouSubtitle: string;
  thankYouTelegram: string;
  telegramButton: string;
  // NOTE: Добавьте эти тексты в ваши файлы словарей (ua.ts, ru.ts и т.д.)
  educationOptions: { grade_9: string; grade_11: string; bachelor: string; undecided: string; };
  langOptions: { czech: string; english: string; both: string; undecided: string; };
  formFields: { name: string; email: string; phone: string; social: string; };
  progressText: string;
  nextButton: string;
  openAnswerPlaceholder: string;
  openAnswerHint: string;
}

interface QuizClientProps {
  dictionary: QuizDictionary;
  lang: string;
}

type Screen = 'start' | 'role' | 'education' | 'language' | 'quiz' | 'lead' | 'thanks';
type UserRole = 'student' | 'parent' | '';
type EducationLevel = 'grade_9' | 'grade_11' | 'bachelor' | 'undecided' | '';

// --- Основной компонент ---
export function ProforientationClientComponent({ dictionary, lang }: QuizClientProps) {
  // --- Состояние компонента (State) ---
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [userRole, setUserRole] = useState<UserRole>('');
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('');
  const [languagePreference, setLanguagePreference] = useState('');
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [openAnswer, setOpenAnswer] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', social: '' });
  const [careerResultsHtml, setCareerResultsHtml] = useState('');

  const MIN_OPEN_ANSWER_LENGTH = 8;

  // --- Логика подсчета очков ---
  const [scores, setScores] = useState({ MED:0, TECH:0, HUM:0, ECO:0, NAT:0 });
  const SCORE_WEIGHTS = { MED: 1, TECH: 1, HUM: 1, ECO: 1, NAT: 1 };
  // Ключевые слова для анализа открытых ответов (в реальном приложении могут быть в словаре)
  const KEYWORD_MAP = {
      MED: ['лікар','мед','пацієнт','клінік','фарма','біолог','біо','хім','догляд','психолог'],
      TECH: ['програм','код','it','айті','робот','інжен','техн','алгоритм','дані','data','машин','штучн'],
      HUM: ['прав','юрист','переклад','мов','істор','комунікац','журналіст','соціолог','педагог','виклад'],
      ECO: ['бізнес','менедж','фінанс','маркет','економ','стартап','підпри','ринок','логіст'],
      NAT: ['еколог','біол','географ','геолог','фізик','лаборатор','дослідж','наука']
  };

  const resetScores = () => setScores({ MED:0, TECH:0, HUM:0, ECO:0, NAT:0 });
  
  const applyTagScores = (tagList: string[]) => {
    if (!Array.isArray(tagList)) return;
    const newScores = {...scores};
    tagList.forEach(t => { if (SCORE_WEIGHTS[t as keyof typeof SCORE_WEIGHTS] != null) newScores[t as keyof typeof scores]++; });
    setScores(newScores);
  };

  const applyKeywordScores = (text: string) => {
    const t = (text || '').toLowerCase();
    const newScores = {...scores};
    for (const dir in KEYWORD_MAP) {
      if (KEYWORD_MAP[dir as keyof typeof KEYWORD_MAP].some(k => t.includes(k))) {
        newScores[dir as keyof typeof scores]++;
      }
    }
    setScores(newScores);
  };

  // --- Управление потоком квиза ---
  const selectQuestions = (role: UserRole, level: EducationLevel) => {
    resetScores();
    if (role === 'parent') {
      setQuestions(dictionary.questions.parent.all);
    } else {
      setQuestions(dictionary.questions.student[level] || dictionary.questions.student.undecided);
    }
    setCurrentScreen('quiz');
  };

  const handleAnswer = (question: any, answer: string, tags: string[] = []) => {
    if (question.type === 'multiple-choice') {
      applyTagScores(tags);
    } else {
      applyKeywordScores(answer);
    }
    setUserAnswers([...userAnswers, { question: question.question, answer, type: question.type }]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOpenAnswer(''); // Сбрасываем текст для следующего открытого вопроса
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setIsLoading(true);
    setCurrentScreen('lead');
    // В реальном приложении здесь будет fetch('/api/generate-report', ...)
    try {
        const topDir = Object.keys(scores).reduce((a, b) => scores[a as keyof typeof scores] > scores[b as keyof typeof scores] ? a : b);
        // Это мок-ответ. Реальный будет приходить от Gemini.
        const mockReport = `<h2>Ваш персональний звіт</h2><p>На основі ваших відповідей, ми визначили, що вам найбільше підходить <b>${dictionary.prompts.DIR_LABELS[topDir]} напрям</b>.</p><p>Детальні рекомендації вже чекають на вашій пошті!</p>`;
        setCareerResultsHtml(mockReport);
    } catch (error) {
        console.error("Report generation failed:", error);
        setCareerResultsHtml("<p>Не вдалося згенерувати звіт. Будь ласка, заповніть форму, і ми надішлемо його вручну.</p>");
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const payload = {
      ...formState,
      userRole,
      educationLevel,
      languagePreference,
      userAnswers,
      scores,
      testResults: careerResultsHtml,
      lang
    };

    // В реальном приложении здесь будет fetch('/api/submit-lead', ...)
    console.log("Submitting lead:", payload);
    await new Promise(r => setTimeout(r, 1000));
    
    setIsLoading(false);
    setCurrentScreen('thanks');
  };


  // --- Рендеринг экранов ---
  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return (
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">{dictionary.startTitle}</h1>
            <p className="text-gray-600 mb-8">{dictionary.startSubtitle}</p>
            <Button color="primary" size="lg" onPress={() => setCurrentScreen('role')}>{dictionary.startButton}</Button>
          </div>
        );
      case 'role':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">{dictionary.roleSelectTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="h-auto py-6" variant="bordered" onPress={() => { setUserRole('student'); setCurrentScreen('education'); }}>
                <div className="text-center"><span className="text-3xl">🎓</span><span className="block mt-2 font-bold">{dictionary.studentButton}</span></div>
              </Button>
              <Button className="h-auto py-6" variant="bordered" onPress={() => { setUserRole('parent'); setCurrentScreen('education'); }}>
                 <div className="text-center"><span className="text-3xl">👨‍👩‍👧‍👦</span><span className="block mt-2 font-bold">{dictionary.parentButton}</span></div>
              </Button>
            </div>
          </div>
        );
      case 'education':
         return (
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">{dictionary.educationSelectTitle}</h2>
            <div className="grid grid-cols-1 gap-4">
              <Button variant="bordered" onPress={() => { setEducationLevel('grade_9'); setCurrentScreen('language'); }}>{dictionary.educationOptions.grade_9}</Button>
              <Button variant="bordered" onPress={() => { setEducationLevel('grade_11'); setCurrentScreen('language'); }}>{dictionary.educationOptions.grade_11}</Button>
              <Button variant="bordered" onPress={() => { setEducationLevel('bachelor'); setCurrentScreen('language'); }}>{dictionary.educationOptions.bachelor}</Button>
              <Button variant="bordered" onPress={() => { setEducationLevel('undecided'); setCurrentScreen('language'); }}>{dictionary.educationOptions.undecided}</Button>
            </div>
          </div>
        );
       case 'language':
         return (
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">{dictionary.langSelectTitle}</h2>
            <div className="grid grid-cols-1 gap-4">
              <Button variant="bordered" onPress={() => { setLanguagePreference('czech'); selectQuestions(userRole, educationLevel); }}>{dictionary.langOptions.czech}</Button>
              <Button variant="bordered" onPress={() => { setLanguagePreference('english'); selectQuestions(userRole, educationLevel); }}>{dictionary.langOptions.english}</Button>
              <Button variant="bordered" onPress={() => { setLanguagePreference('both'); selectQuestions(userRole, educationLevel); }}>{dictionary.langOptions.both}</Button>
              <Button variant="bordered" onPress={() => { setLanguagePreference('undecided'); selectQuestions(userRole, educationLevel); }}>{dictionary.langOptions.undecided}</Button>
            </div>
          </div>
        );
      case 'quiz':
        if (!questions || questions.length === 0) return <Spinner />;
        const currentQuestion = questions[currentQuestionIndex];
        const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;
        return (
          <div className="w-full">
            <Progress aria-label="Прогресс" value={progressValue} className="mb-2" />
            <p className="text-sm text-gray-500 mb-6">{dictionary.progressText} {currentQuestionIndex + 1} / {questions.length}</p>
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-6">{currentQuestion.question}</h2>
            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.type === 'multiple-choice' ? (
                currentQuestion.options.map((option: string, index: number) => (
                  <Button key={option} variant="bordered" className="h-auto py-3 text-left justify-start" onPress={() => handleAnswer(currentQuestion, option, currentQuestion.tags[index])}>
                    {option}
                  </Button>
                ))
              ) : (
                <>
                  <Textarea 
                    placeholder={dictionary.openAnswerPlaceholder} 
                    minRows={3}
                    value={openAnswer}
                    onValueChange={setOpenAnswer}
                  />
                  <Button color="primary" className="mt-4 w-full" isDisabled={openAnswer.trim().length < MIN_OPEN_ANSWER_LENGTH} onPress={() => handleAnswer(currentQuestion, openAnswer)}>
                    {dictionary.nextButton}
                  </Button>
                </>
              )}
            </div>
          </div>
        );
      case 'lead':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">{dictionary.formTitle}</h2>
            <p className="text-gray-600 mb-6">{dictionary.formSubtitle}</p>
             {isLoading ? <Spinner /> : (
                <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50 mb-6">
                    <div className="p-4 filter blur-sm" dangerouslySetInnerHTML={{ __html: careerResultsHtml }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                    <span className="absolute bottom-2 right-3 text-xs text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">Повний звіт надішлемо на пошту</span>
                </div>
             )}
            <form onSubmit={handleFormSubmit} className="text-left grid gap-4">
              <Input isRequired label={dictionary.formFields.name} value={formState.name} onValueChange={(val) => setFormState({...formState, name: val})} />
              <Input isRequired type="email" label={dictionary.formFields.email} value={formState.email} onValueChange={(val) => setFormState({...formState, email: val})} />
              <Input label={dictionary.formFields.phone} value={formState.phone} onValueChange={(val) => setFormState({...formState, phone: val})} />
              <Input label={dictionary.formFields.social} value={formState.social} onValueChange={(val) => setFormState({...formState, social: val})} />
              <Button type="submit" color="primary" size="lg" isLoading={isLoading}>{dictionary.formButton}</Button>
            </form>
          </div>
        );
      case 'thanks':
        return (
          <div>
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">{dictionary.thankYouTitle}</h2>
            <p className="text-gray-600 mb-2">{dictionary.thankYouSubtitle}</p>
            <p className="font-semibold mb-4">{dictionary.thankYouTelegram}</p>
            <Button as="a" href="https://t.me/+DoHyuCfx2eU5ODMy" target="_blank" color="primary">{dictionary.telegramButton}</Button>
          </div>
        );
      default:
        return <Spinner />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="w-full max-w-2xl p-4 sm:p-6">
        <CardBody className="text-center">
          {renderScreen()}
        </CardBody>
      </Card>
    </div>
  );
}
