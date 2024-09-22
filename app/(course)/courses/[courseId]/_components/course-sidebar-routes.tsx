"use client"

import {TableOfContents, UserPen} from "lucide-react";
import {CourseSidebarItem} from "@/app/(course)/courses/[courseId]/_components/course-sidebar-item";
import {usePathname} from "next/navigation";
import {CourseListItem} from "@/app/(course)/courses/[courseId]/_components/course-list-item";
import {Chapter, Course, Purchase, UserProgress} from "@prisma/client";

interface CourseSidebarRoutesProps {
  courseId: string
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  }
  purchase: Purchase | null
}

export const CourseSidebarRoutes = ({courseId, course, purchase}: CourseSidebarRoutesProps) => {
  const pathname = usePathname()

  const routes = [
    {
      icon: TableOfContents,
      label: "Chapters",
      href: `/courses/${courseId}`,
      activeIf: !pathname.includes("/author")
    },
    {
      icon: UserPen,
      label: "Your Instructor",
      href: `/courses/${courseId}/author`,
      activeIf: pathname.includes("/author")
    }
  ]

  const isChapterPage = pathname?.includes("/chapters")

  return (
      <div className={"w-full h-full"}>
        {isChapterPage && (
            <>
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
            </>
        )}
        {!isChapterPage && (
            <>
              {routes.map(route => (
                  <CourseSidebarItem
                      key={route.label}
                      label={route.label}
                      icon={route.icon}
                      href={route.href}
                      isActive={route.activeIf}
                  />
              ))}
            </>
        )}
      </div>
  )
}