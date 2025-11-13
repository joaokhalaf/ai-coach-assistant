import z from 'zod'

export const WorkoutExerciseSchema = z.object({
  id: z.string().describe('ID do exercício no treino'),
  workoutId: z.string().describe('ID do treino'),
  exerciseId: z.string().describe('ID do exercício'),

  sets: z.number().describe('Número de séries'),
  reps: z.number().describe('Número de repetições'),
  load: z.string().nullable().describe('Carga do exercício'),
  notes: z.string().nullable().describe('Notas sobre o exercício'),
  createdAt: z.string().describe('Data de criação'),
  updatedAt: z.string().describe('Data de atualização'),
  exercise_name: z.string().describe('Nome do exercício'),
})

export const WorkoutSchema = z.object({
  id: z.string().describe('ID do treino'),
  userId: z.string().describe('ID do usuário'),
  cycleId: z.string().nullable().describe('ID do ciclo de treino'),
  date: z.string().describe('Data do treino'),
  completed: z.boolean().describe('Se o treino foi concluído'),
  createdAt: z.string().describe('Data de criação'),
  updatedAt: z.string().describe('Data de atualização'),
})

export const GetWorkoutResponseSchema = z.object({
  workout: WorkoutSchema.describe('Informações do treino'),
  workout_exercises: z
    .array(WorkoutExerciseSchema)
    .describe('Exercícios do treino'),
})

export type Workout = z.infer<typeof WorkoutSchema>
export type WorkoutExercise = z.infer<typeof WorkoutExerciseSchema>
export type GetWorkoutResponse = z.infer<typeof GetWorkoutResponseSchema>
