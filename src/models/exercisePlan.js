class ExercisePlan {
  static async find (prisma, id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        firstName: true,
        ExercisesPlan: {
          select: {
            id: true,
            ExercisesDay: {
              select: {
                id: true,
                day: true,
                Exercise: {
                  select: {
                    id: true,
                    exerciseName: true
                  }
                }
              }
            }
          }
        }
      }
    })
    return user
  }

  static async create (prisma, userId) {
    const exercisePlan = await prisma.exercisesPlan.create({
      data: {
        userId,
        ExercisesDay: {
          create: {
            Exercise: { create: {} }
          }
        }
      }
    })
    return exercisePlan
  }
}

export default ExercisePlan
