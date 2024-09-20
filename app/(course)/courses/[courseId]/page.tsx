import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs/server";
import {Button} from "@/components/ui/button";
import {ChevronRight} from "lucide-react";
import Link from "next/link";
import {CourseListItem} from "@/app/(course)/courses/[courseId]/_components/course-list-item";

const CourseIdPage = async (
    {params}: {
      params: { courseId: string };
    }
) => {
  const {userId} = auth()

  if (!userId) redirect("/home")

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: userId,
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  })

  if (!course) redirect("/home")

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: course.id
      }
    }
  })

  const nextChapter = course.chapters.filter(chapter => !chapter.userProgress[0]?.isCompleted)[0];

  if (!course) redirect("/home")

  return (
      <div className={"flex flex-col gap-y-8 w-full px-10 py-14"}>
        <div className={"text-2xl"}>
          <span>{course.title}</span>
        </div>
        <div className={"flex items-center gap-x-4 bg-neutral-200 rounded-md"}>
          <Link href={`/courses/${params.courseId}/chapters/${nextChapter.id}`}>
            <Button className={"flex gap-x-3 bg-pink-600 hover:bg-pink-700 font-bold tracking-wide"}>
              <span>{nextChapter.position === 0 ? "start lesson" : "start next lesson"}</span>
              <ChevronRight/>
            </Button>
          </Link>
          <span className={"text-sm"}>
            {nextChapter.position + 1} - {nextChapter.title}
          </span>
        </div>
        <div className={"flex flex-col w-full"}>
          {course.chapters.map(chapter => (
              <CourseListItem
                  key={chapter.id}
                  id={chapter.id}
                  label={chapter.title}
                  isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                  courseId={course.id}
                  isLocked={!chapter.isFree && !purchase}
                  position={chapter.position + 1}
              />
          ))}
        </div>
      </div>
  )
};

export default CourseIdPage;