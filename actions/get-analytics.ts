import {Course, Purchase} from "@prisma/client";
import {db} from "@/lib/db";

type PurchasedWithCourse = Purchase & {
  course: Course
}

const groupByCourse = (purchased: PurchasedWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {}

  purchased.forEach(purchased => {
    const courseTitle = purchased.course.title

    if (!grouped[courseTitle]) grouped[courseTitle] = 0

    grouped[courseTitle] += purchased.course.price!
  })

  return grouped
}

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId: userId
        }
      },
      include: {
        course: true
      }
    })

    const groupedEarnings = groupByCourse(purchases)
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total
    }))

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0)
    const totalSales = purchases.length

    return {
      data,
      totalRevenue,
      totalSales
    }
  } catch (err) {
    console.error("[GET_ANALYTICS]", err)
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0
    }
  }
}