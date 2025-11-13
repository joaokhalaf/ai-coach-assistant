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
    return result
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
