import {Category, Course} from "@prisma/client";
import {db} from "@/lib/db";
import {getProgress} from "@/actions/get-progress";

type CoursesWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[]
  progress: number | null
}

type GetCourses = {
  userId: string
  title: string
  categoryId?: string
}

export const getCourses = async ({
                                   userId,
                                   title,
                                   categoryId
                                 }: GetCourses): Promise<CoursesWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title
        },
        categoryId: categoryId
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true
          },
          select: {
            id: true
          }
        },
        purchases: {
          where: {
            userId: userId
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      }
    })

    const courseWithProgress: CoursesWithProgressWithCategory[] = await
        Promise.all(
            courses.map(async course => {
              if (course.purchases.length === 0)
                return {
                  ...course,
                  progress: null
                }

              const progressPercentage = await getProgress(userId, course.id)

              return {
                ...course,
                progress: progressPercentage
              }
            })
        )

    return courseWithProgress
  } catch (err) {
    console.error("[GET_COURSES", err)
    return []
  }
}