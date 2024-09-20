"use client"

import {TableOfContents, UserPen} from "lucide-react";
import {CourseSidebarItem} from "@/app/(course)/courses/[courseId]/_components/course-sidebar-item";
import {usePathname} from "next/navigation";

export const CourseSidebarRoutes = ({courseId}: { courseId: string }) => {
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

  return (
      <div className={"w-full h-full"}>
        {routes.map(route => (
            <CourseSidebarItem
                key={route.label}
                label={route.label}
                icon={route.icon}
                href={route.href}
                isActive={route.activeIf}
            />
        ))}
      </div>
  )
}