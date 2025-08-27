// /dictionaries/quiz/questions.ts

type QuestionType = "multiple-choice" | "open-ended";

interface Option {
  answers: string[];   // массив строк для разных формулировок одного варианта
  tags: string[];      // массив тегов для этого варианта
}

interface Question {
  type: QuestionType;
  question: string;
  options?: Option[];
}

interface QuestionSet {
  [key: string]: Question[];
}

interface QuestionBank {
  student: {
    grade_9: Question[];
    grade_11: Question[];
    bachelor: Question[];
    undecided: Question[];
  };
  parent: {
    all: Question[];
  };
}

export const questions: QuestionBank = {
  student: {
    grade_9: [
      {
        type: "multiple-choice",
        question: "Що тобі найцікавіше вивчати?",
        options: [
          { answers: ["Як влаштований світ і природа (біологія, хімія)"], tags: ["NAT", "MED"] },
          { answers: ["Як працюють технології та комп'ютери (інформатика, фізика)"], tags: ["TECH"] },
          { answers: ["Як взаємодіють люди та суспільство (історія, мови, право)"], tags: ["HUM"] },
          { answers: ["Як працюють гроші та бізнес (математика, економіка)"], tags: ["ECO", "TECH"] }
        ]
      },
      {
        type: "multiple-choice",
        question: "Який тип завдань тобі до душі?",
        options: [
          { answers: ["Допомагати людям, вирішувати їхні проблеми"], tags: ["MED", "HUM"] },
          { answers: ["Створювати щось нове: програми, механізми, дизайн"], tags: ["TECH"] },
          { answers: ["Аналізувати інформацію, писати тексти, вивчати мови"], tags: ["HUM"] },
          { answers: ["Організовувати процеси, керувати командою, рахувати"], tags: ["ECO"] }
        ]
      },
      {
        type: "open-ended",
        question: "Уяви свою роботу через 10 років. Опиши одним реченням, чим ти займаєшся?"
      }
    ],
    grade_11: [
      {
        type: "multiple-choice",
        question: "Який напрям підготовки до іспитів (ЗНО/НМТ) тобі найближчий?",
        options: [
          { answers: ["Біологія та хімія"], tags: ["MED", "NAT"] },
          { answers: ["Фізика та математика"], tags: ["TECH"] },
          { answers: ["Історія та іноземні мови"], tags: ["HUM"] },
          { answers: ["Математика та географія/англійська"], tags: ["ECO"] }
        ]
      },
      {
        type: "multiple-choice",
        question: "Що для тебе найважливіше в майбутньому університеті?",
        options: [
          { answers: ["Можливість отримати престижний диплом"], tags: ["HUM"] },
          { answers: ["Максимум практики та стажувань під час навчання"], tags: ["TECH", "ECO"] },
          { answers: ["Сильна наукова база та можливість займатися дослідженнями"], tags: ["MED", "NAT"] },
          { answers: ["Доступна вартість навчання та життя в місті"], tags: [] }
        ]
      },
      {
        type: "open-ended",
        question: "Яка твоя найбільша мета при вступі до університету за кордоном?"
      }
    ],
    bachelor: [
      {
        type: "multiple-choice",
        question: "Що є головною метою вашого вступу до магістратури?",
        options: [
          { answers: ["Поглибити знання у своїй спеціальності для кар'єрного зростання"], tags: [] },
          { answers: ["Змінити спеціальність на більш перспективну"], tags: ["TECH", "ECO"] },
          { answers: ["Отримати європейський диплом для роботи в ЄС"], tags: [] },
          { answers: ["Зайнятися науковою діяльністю, вступити на PhD"], tags: ["MED", "NAT"] }
        ]
      },
      {
        type: "multiple-choice",
        question: "Який формат навчання вам більше підходить?",
        options: [
          { answers: ["Практичний, з фокусом на проєктах та стажуваннях"], tags: ["TECH", "ECO"] },
          { answers: ["Академічний, з поглибленою теорією та дослідженнями"], tags: ["MED", "NAT"] },
          { answers: ["Комбінований, збалансований формат"], tags: [] },
          { answers: ["Вечірній або заочний, щоб поєднувати з роботою"], tags: [] }
        ]
      },
      {
        type: "open-ended",
        question: "Опишіть коротко ваш попередній досвід (освіта, робота) та очікування від магістерської програми."
      }
    ],
    undecided: [
      {
        type: "multiple-choice",
        question: "Який із цих видів діяльності приваблює тебе найбільше?",
        options: [
          { answers: ["Допомагати та лікувати"], tags: ["MED", "NAT"] },
          { answers: ["Винаходити та будувати"], tags: ["TECH"] },
          { answers: ["Спілкуватися та домовлятися"], tags: ["HUM"] },
          { answers: ["Аналізувати та рахувати"], tags: ["ECO"] }
        ]
      },
      {
        type: "multiple-choice",
        question: "Що для тебе важливіше в роботі?",
        options: [
          { answers: ["Стабільність та соціальна значущість"], tags: ["MED", "HUM"] },
          { answers: ["Високий дохід та кар'єрне зростання"], tags: ["ECO"] },
          { answers: ["Творчість та самовираження"], tags: ["HUM"] },
          { answers: ["Можливість постійно вчитися новому"], tags: ["TECH", "NAT"] }
        ]
      },
      {
        type: "open-ended",
        question: "Якби в тебе була будь-яка можливість, яку одну проблему у світі ти б хотів(ла) вирішити?"
      }
    ]
  },
  parent: {
    all: [
      {
        type: "multiple-choice",
        question: "Що для вас є головним пріоритетом при виборі освіти для дитини?",
        options: [
          { answers: ["Гарантоване працевлаштування після випуску"], tags: ["TECH", "ECO"] },
          { answers: ["Престиж університету та якість освіти"], tags: ["HUM", "MED"] },
          { answers: ["Безпека та комфорт проживання в країні"], tags: [] },
          { answers: ["Мінімальні фінансові витрати на навчання та життя"], tags: [] }
        ]
      },
      {
        type: "multiple-choice",
        question: "Який із цих талантів найяскравіше виражений у вашої дитини?",
        options: [
          { answers: ["Емпатія та бажання допомагати іншим"], tags: ["MED", "HUM"] },
          { answers: ["Логічне мислення та любов до техніки"], tags: ["TECH"] },
          { answers: ["Комунікабельність та гуманітарний склад розуму"], tags: ["HUM"] },
          { answers: ["Аналітичні здібності та інтерес до бізнесу"], tags: ["ECO"] }
        ]
      },
      {
        type: "open-ended",
        question: "Що є вашим найбільшим занепокоєнням щодо вступу дитини за кордон?"
      }
    ]
  }
};
