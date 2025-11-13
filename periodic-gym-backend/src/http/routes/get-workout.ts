import { Elysia } from 'elysia'
import { withAuth } from '../plugins/better-auth'
import getWorkoutByUserId from '../services/workout/get-by-user'
import {
  GetWorkoutResponse,
  GetWorkoutResponseSchema,
} from './schemas/workout/get-workout'

export const getWorkout = new Elysia().use(withAuth()).get(
  '/workout/:id',
  async ({ user }): Promise<GetWorkoutResponse> => {
    const result = await getWorkoutByUserId(user.id)

    return {
      workout: {
        ...result.workout,
        date: result.workout.date.toISOString(),
        createdAt: result.workout.createdAt.toISOString(),
        updatedAt: result.workout.updatedAt.toISOString(),
      },
      workout_exercises: result.workout_exercises.map(ex => ({
        ...ex.workout_exercises,
        exercise_name: ex.exercises.name,
        createdAt: ex.workout_exercises.createdAt.toISOString(),
        updatedAt: ex.workout_exercises.updatedAt.toISOString(),
      })),
    }
  },
  {
    auth: true,
    response: GetWorkoutResponseSchema,
    description: 'Get the workout of the user',
    detail: {
      summary: 'Get Workout',
      description: 'Get the workout of the user',
      tags: ['Workout'],
    },
  },
)
