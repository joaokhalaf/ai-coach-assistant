import BaseException from './base-exception'

export default class WorkoutNotFoundException extends BaseException {
  constructor() {
    super({
      message: `Workout not found`,
      code: 'WORKOUT_NOT_FOUND',
      statusCode: 404,
    })
  }
}
