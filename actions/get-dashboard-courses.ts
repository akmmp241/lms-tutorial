import {Category, Chapter, Course} from "@prisma/client";
import {db} from "@/lib/db";
import {getProgress} from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category
  chapters: Chapter[]
  progress: number|null
}

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[]
  courseInProgress: CourseWithProgressWithCategory[]
}

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    const purchasedCourse = await db.purchase.findMany({
      where: {
        userId: userId
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true
              }
            }
          }
        }
      }
    })

    const courses = purchasedCourse.map(purchase =>  purchase.course) as CourseWithProgressWithCategory[]

    for (let course of courses) {
      course["progress"] = await getProgress(userId, course.id)
    }

    const completedCourses = courses.filter(course => course.progress === 100)
    const courseInProgress = courses.filter(course => (course.progress ?? 0) < 100)

    return {
      completedCourses,
      courseInProgress
    }

  } catch (err) {
    console.error("[GET_DASHBOARD_COURSES]", err)
    return {
      completedCourses: [],
      courseInProgress: []
    }
  }
}