import { client } from './client'
import {
  quizzesQuery,
  quizBySlugQuery,
  quizWithOrderedQuestionsQuery,
  universitiesByDirectionQuery,
  allUniversitiesQuery,
  schoolsByDirectionQuery,
  allSchoolsQuery,
} from './queries'
import type { Quiz, QuizListItem, University, School, Direction } from './types'

/**
 * Get all active quizzes
 */
export async function getQuizzes(): Promise<QuizListItem[]> {
  try {
    const quizzes = await client.fetch<QuizListItem[]>(quizzesQuery)
    return quizzes
  } catch (error) {
    console.error('Error fetching quizzes:', error)
    return []
  }
}

/**
 * Get a single quiz by slug
 */
export async function getQuizBySlug(slug: string): Promise<Quiz | null> {
  try {
    const quiz = await client.fetch<Quiz>(quizWithOrderedQuestionsQuery, {
      slug,
    })
    return quiz
  } catch (error) {
    console.error(`Error fetching quiz with slug "${slug}":`, error)
    return null
  }
}

/**
 * Check if a quiz exists and is active
 */
export async function isQuizActive(slug: string): Promise<boolean> {
  try {
    const quiz = await client.fetch<Quiz>(quizBySlugQuery, { slug })
    return quiz?.isActive || false
  } catch (error) {
    console.error(`Error checking quiz status for "${slug}":`, error)
    return false
  }
}

/**
 * Get quiz count
 */
export async function getQuizCount(): Promise<number> {
  try {
    const count = await client.fetch<number>(
      `count(*[_type == "quiz" && isActive == true])`
    )
    return count
  } catch (error) {
    console.error('Error fetching quiz count:', error)
    return 0
  }
}

/**
 * Get universities by direction
 */
export async function getUniversitiesByDirection(
  direction: Direction
): Promise<University[]> {
  try {
    const universities = await client.fetch<University[]>(
      universitiesByDirectionQuery,
      { direction }
    )
    return universities
  } catch (error) {
    console.error(`Error fetching universities for direction "${direction}":`, error)
    return []
  }
}

/**
 * Get all universities
 */
export async function getAllUniversities(): Promise<University[]> {
  try {
    const universities = await client.fetch<University[]>(allUniversitiesQuery)
    return universities
  } catch (error) {
    console.error('Error fetching all universities:', error)
    return []
  }
}

/**
 * Get schools by direction
 */
export async function getSchoolsByDirection(
  direction: Direction
): Promise<School[]> {
  try {
    const schools = await client.fetch<School[]>(schoolsByDirectionQuery, {
      direction,
    })
    return schools
  } catch (error) {
    console.error(`Error fetching schools for direction "${direction}":`, error)
    return []
  }
}

/**
 * Get all schools
 */
export async function getAllSchools(): Promise<School[]> {
  try {
    const schools = await client.fetch<School[]>(allSchoolsQuery)
    return schools
  } catch (error) {
    console.error('Error fetching all schools:', error)
    return []
  }
}
