import {Chapter, Course, UserProgress} from "@prisma/client";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import {CourseProgress} from "@/components/course-progress";
import Image from "next/image";
import {CourseSidebarRoutes} from "@/app/(course)/courses/[courseId]/_components/course-sidebar-routes";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number
}

export const CourseSidebar = async ({course, progressCount}: CourseSidebarProps) => {
  const {userId} = auth()

  if (!userId) redirect("/home")

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: course.id
      }
    }
  })

  return (
      <div className={"h-full border-r flex flex-col overflow-y-auto shadow-2xl"}>
        <div className={"relative h-48 w-full bg-black"}>
          <Image
              src={course.imageUrl!}
              alt={course.title}
              fill
          />
        </div>
        <div className={"p-8 flex flex-col border-b"}>
          <h1 className={"text-xl font-semibold break-words"}>
            {course.title}
          </h1>
          {purchase && (
              <div className={"mt-4"}>
                <CourseProgress
                    variant={"default"}
                    size={"big"}
                    value={progressCount}
                />
              </div>
          )}
        </div>
        <div className={"flex flex-col w-full"}>
          <CourseSidebarRoutes purchase={purchase} course={course} courseId={course.id} />
        </div>
      </div>
  )
}