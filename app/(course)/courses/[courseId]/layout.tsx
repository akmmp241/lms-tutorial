import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import {getProgress} from "@/actions/get-progress";
import {CourseSidebar} from "@/app/(course)/courses/[courseId]/_components/course-sidebar";
import {CourseNavbar} from "@/app/(course)/courses/[courseId]/_components/course-navbar";

const CourseLayout = async ({children, params}: { children: React.ReactNode, params: { courseId: string } }) => {
  const {userId} = auth()

  if (!userId) redirect("/home")

  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    },
    include: {
      chapters: {
        where: {
          isPublished: true
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

  const progressCount = await getProgress(userId, course.id)

  return (
      <div className={"h-full"}>
        <div className={"h-[60px] fixed inset-y-0 w-full z-50"}>
          <CourseNavbar course={course} progressCount={progressCount} />
        </div>
        <div className={"hidden md:flex h-full pt-[60px] w-80 flex-col fixed"}>
          <CourseSidebar
              course={course}
              progressCount={progressCount}
          />
        </div>
        <main className={"md:pl-80 pt-[60px] h-full"}>
          {children}
        </main>
      </div>
  );
};

export default CourseLayout;