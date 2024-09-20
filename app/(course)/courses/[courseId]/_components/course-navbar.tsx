import {Chapter, Course, UserProgress} from "@prisma/client";
import {CourseMobileSidebar} from "@/app/(course)/courses/[courseId]/_components/course-mobile-sidebar";
import React from "react";
import NavbarRoutes from "@/app/(course)/courses/[courseId]/_components/navbar-routes";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[]
    })[]
  },
  progressCount: number,
}

export const CourseNavbar = (
    {
      course,
      progressCount
    }: CourseNavbarProps) => {

  const nextChapter = course.chapters.filter(chapter => !chapter?.userProgress![0]?.isCompleted)[0];
  const previous = course.chapters.filter(chapter => chapter?.userProgress![0]?.isCompleted);
  const previousChapter = previous.length < 1 ? null : previous[previous.length - 1].id


  return (
      <>
        <div className={"p-4 h-[60px] flex items-center px-8 shadow-sm bg-violet-700"}>
          <CourseMobileSidebar
              course={course}
              progressCount={progressCount}
          />
          <NavbarRoutes nextChapterId={nextChapter.id} previousChapterId={previousChapter} courseId={course.id}/>
        </div>
      </>
  )
}