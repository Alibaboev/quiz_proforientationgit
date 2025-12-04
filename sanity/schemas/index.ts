import quiz from './quiz'
import university from './university'
import school from './school'
import simpleQuestion from './simpleQuestion'

export const schemaTypes = [
  // Основная схема квиза
  quiz,

  // Вопросы
  simpleQuestion,

  // Университеты и школы
  university,
  school,
]