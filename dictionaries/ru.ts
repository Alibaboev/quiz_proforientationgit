import i1 from "@/public/fixed-width-1.svg";
import i0 from "@/public/fixed-width.svg";
import i2 from "@/public/fixed-width-2.svg";
import i3 from "@/public/fixed-width-3.svg";
import i4 from "@/public/fixed-width-4.svg";
import i7 from "@/public/fixed-width-7.svg";
import i5 from "@/public/fixed-width-5.svg";
import i6 from "@/public/fixed-width-6.svg";
import {SliderCardInfo} from "@/types";
import alu1 from "@/public/Rectangle 334.png";
import alu2 from "@/public/Rectangle 337.png";
import alu3 from "@/public/Rectangle 336.png";
import alu4 from "@/public/Rectangle 345.png";
import {uniLogos} from "@/components/data";

const cardsTextRU = [
    {title: "Изучение чешского языка", sub: "с нуля до уровня B2 за полгода", icon: i1},
    {title: "Подготовку по предметам", sub: "(физика, биология, математика, химия)", icon: i0},
    {title: "Визовая поддержка", sub: "", icon: i2},
    {title: "Помощь в выборе университета", sub: "", icon: i3},
    {title: "Нострификацию документов об образовании", sub: "", icon: i4},
    {title: "Подготовку к собеседованию и пробные экзамены", sub: "", icon: i7},
    {title: "Дружное комьюнити абитуриентов и студентов", sub: "", icon: i5},
    {title: "Поддержку в адаптации к новой стране", sub: "", icon: i6}
];

const sliderCardsRU: SliderCardInfo[] = [
    {
        title: "Таисия Квач, 19",
        img: alu1,
        sub: "г. Днепр, Украина",
        description: "Студентка стоматологии на Медицинском факультете в г. Пльзень. Ранее училась в школе в г. Днепр и после окончания годового курса Medstudy успешно сдала вступительные экзамены на 69/65 баллов.",
        linkName: "Интервью с Таисией",
        linkUrl: "https://youtu.be/YPHOsEuXZYs?si=KLbTYnHeMQkX5Gbg"
    },
    {
        title: "Кирил Калабухов, 17",
        sub: "г. Александрия, Украина",
        img: alu2,
        description: "Набрал на вступительных экзаменах на 2.ЛФ – 251/219 балов. Учился до курсов в лицее в Украине. Сразу после окончания 11 класса поступил на 2-й Медицинский факультет в Праге, окончив полугодовые курсы Medstudy.",
        linkName: "Интервью с Кириллом",
        linkUrl: "https://youtube.com/shorts/EpOV1oy_9eg?si=P6fbc_QJHyps1GtT"
    },
    {
        title: "Виктория Ромушка, 19",
        sub: "г. Ужгород, Украина",
        img: alu3,
        description: "Студентка стоматологии 1-го Медицинского факультета в Праге. Виктория обучалась в Медицинском университете в Украине и успешно завершила годовые курсы Medstudy. Ее зачислили на все стоматологические факультеты в Чехии.",
        linkName: "Интервью с Викторией",
        linkUrl: "https://youtu.be/bWa9zLXp1L4?si=t857ARkM7GeYK5zW"
    },
    {
        title: "Анастасия Кузнецова, 26",
        sub: "г. Одесса, Украина",
        img: alu4,
        description: "Сейчас является студенткой 3-го Медицинского факультета в Праге. После окончания школы поступила на моле-кулярную и клеточную биоло-гию в г. Оломоуц, но затем пришла на полугодовые курсы, которые успешно завершила.",
        linkName: "Интервью с Анастасией",
        linkUrl: "https://youtube.com/shorts/FMtkrkWFmuk?si=EP6Wf_0GzjYFAWu5"
    }
];

export const textRU = {
    "first": {
        heading: "Поможем поступить иностранным абитуриентам на бюджет в ВУЗы Чехии!",
        subheading: "Подготовительные курсы от Medstudy",
        button: "Получить консультацию"
    },
    "second": {
        heading: "Поступайте на бюджет с Medstudy!",
        subheadings: {
            second: "Вы мечтаете о высшем образовании в Европе? Мы готовы сделать вашу мечту реальностью. ",
            third: "Medstudy предоставляет уникальные программы подготовки и поддержки.",
            first: ""
        }
    },
    "third": {
        heading: "С Medstudy вы получаете:",
        cardsText: cardsTextRU
    },
    "fourth": {
        heading: "Университеты - партнеры",
        subheading: "Лучшие университеты, в которые мы Вас готовим",
        uniLogos: uniLogos
    },
    "fifth": {
        heading: "Более 1000 студентов уже поступили на бюджет в чешские вузы благодаря Medstudy."
    },
    "six": {
        heading: "Воплощайте свои мечты в жизнь с Medstudy",
        subheadings: {
            first: "Наши студенты уже учатся в лучших вузах Чехии – Карлов университет, Технический университет в Праге, Масариков университет в Брно.",
            second: "С Medstudy вы получите возможность обучаться на бюджете в лучших чешских вузах.",
            third: "Это ваш шанс на качественное и престижное образование, которое высоко ценится работодателями в странах Европы и за ее пределами."
        },
        button: "Нажмите, чтобы начать!"
    },
    "seventh": {
        heading: "Истории успеха наших выпускников",
        sliderCards: sliderCardsRU
    },
    "footer": {
        moto: "Готовим абитуриентов \n к поступлению в чешские ВУЗы!",
    },
    "navbar": {
        lang: "ru"
    },
    "modalForm": {
        heading: "Форма записи",
        fields: {
            first: "Имя",
            second: "Телефон",
            third: "Email"
        },
        checkbox: "Я соглашаюсь с политикой обработки персональных данных и куки",
        button: "Записаться",
        thanks: {
            heading: "Благодарим за заполнение формы!",
            subheading: "Наш менеджер свяжется с вами в ближайшее время"
        }
    }
};