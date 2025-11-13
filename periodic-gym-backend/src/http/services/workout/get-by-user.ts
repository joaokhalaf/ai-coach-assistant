import { db } from '@/database/client'
import { eq } from 'drizzle-orm'
import { workouts } from '@/database/schema/workouts'
import { workoutExercises } from '@/database/schema/workout-exercises'
import DrizzleException from '@/http/errors/drizzle-exception'
import WorkoutNotFoundException from '@/http/errors/workout-not-found'
import { exercises } from '@/database/schema/exercises'

export default async function getWorkoutByUserId(userId: string) {
  const [workoutResult] = await db
    .select()
    .from(workouts)
    .where(eq(workouts.userId, userId))

  if (!workoutResult) {
    throw new WorkoutNotFoundException()
  }

  const workoutExercisesData = await db
    .select()
    .from(workoutExercises)
    .innerJoin(exercises, eq(workoutExercises.exerciseId, exercises.id))
    .where(eq(workoutExercises.workoutId, workoutResult.id))

  return { workout: workoutResult, workout_exercises: workoutExercisesData }
}
