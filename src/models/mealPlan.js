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

  // mealPlan.js

  static async create (prisma, userId) {
    const mealPlan = await prisma.mealPlan.create({
      data: {
        userId,
        mealDay: {
          // Agregar mealDay dentro de data para crear los días
          create: [
            { day: 'Lunes' },
            { day: 'Martes' },
            { day: 'Miércoles' },
            { day: 'Jueves' },
            { day: 'Viernes' },
            { day: 'Sábado' },
            { day: 'Domingo' }
          ]
        }
      },
      include: {
        mealDay: true // Incluir los días en la respuesta
      }
    })

    return mealPlan
  }
}
export default MealPlan
