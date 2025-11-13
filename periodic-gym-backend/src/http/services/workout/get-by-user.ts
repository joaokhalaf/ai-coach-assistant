import { db } from '@/database/client'
import { eq, inArray } from 'drizzle-orm'
import { workouts } from '@/database/schema/workouts'
import { workoutExercises } from '@/database/schema/workout-exercises'
import WorkoutNotFoundException from '@/http/errors/workout-not-found'
import { exercises } from '@/database/schema/exercises'

export default async function getWorkoutByUserId(userId: string) {
  const workoutsResult = await db
    .select()
    .from(workouts)
    .where(eq(workouts.userId, userId))

  if (!workoutsResult.length) {
    throw new WorkoutNotFoundException()
  }

  const workoutIds = workoutsResult.map(w => w.id)

  const exercisesRows = await db
    .select()
    .from(workoutExercises)
    .innerJoin(exercises, eq(workoutExercises.exerciseId, exercises.id))
    .where(inArray(workoutExercises.workoutId, workoutIds))

  const map = new Map<string, Array<any>>()
  for (const row of exercisesRows) {
    const we = row.workout_exercises
    const exName = row.exercises.name
    const converted = {
      ...we,
      exercise_name: exName,
      createdAt: we.createdAt.toISOString(),
      updatedAt: we.updatedAt.toISOString(),
      load: we.load !== null && we.load !== undefined ? String(we.load) : null,
    }
    const arr = map.get(we.workoutId) ?? []
    arr.push(converted)
    map.set(we.workoutId, arr)
  }

  const resultWorkouts = workoutsResult.map(w => ({
    ...w,
    date: w.date.toISOString(),
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
    workout_exercises: map.get(w.id) ?? [],
  }))

  return { workouts: resultWorkouts }
}
