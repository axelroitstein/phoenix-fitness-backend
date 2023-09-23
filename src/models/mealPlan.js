class MealPlan {
  static async find (prisma, id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        firstName: true,
        MealPlan: {
          select: {
            id: true,
            mealDay: {
              select: {
                id: true,
                day: true,
                breakfast: true,
                brunch: true,
                lunch: true,
                snack: true,
                drunch: true,
                dinner: true
              }
            }
          }
        }
      }
    })
    return user
  }

  static async create (prisma, userId) {
    const mealPlan = await prisma.mealPlan.create({
      data: {
        userId,
        mealDay: {
          create: {}
        }
      }
    })
    return mealPlan
  }
}

export default MealPlan
