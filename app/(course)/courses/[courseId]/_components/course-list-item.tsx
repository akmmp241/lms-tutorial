"use client"

import {usePathname, useRouter} from "next/navigation";
import {CheckCircle, Lock, PlayCircle} from "lucide-react";
import {cn} from "@/lib/utils";

interface CourseSidebarItemProps {
  label: string
  id: string
  isCompleted: boolean
  courseId: string
  isLocked: boolean
  position: number
}

export const CourseListItem = (
    {
      label,
      id,
      isCompleted,
      courseId,
      isLocked,
      position
    }: CourseSidebarItemProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const isChapterPage = pathname.includes("/chapters")

  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle)
  const isActive = pathname?.includes(id)

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`)
  }

  return (
      <button
          onClick={onClick}
          type="button"
          className={cn(
              "flex items-center gap-x-2 text-slate-500 w-full h-1/2 text-sm font-[500] transition-all hover:text-slate-600 hover:bg-slate-300/20",
              isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
          )}
      >
        <div
            className={cn(
                "opacity-0 border-2 border-slate-700 h-full transition-all mr-6",
                isActive && "opacity-100",
                isCompleted && "border-pink-600"
            )}
        />
        <div className={"flex items-center gap-x-2 h-10 my-0.5"}>
          <Icon
              size={22}
              className={cn(
                  "text-slate-500",
                  isActive && "text-slate-700",
                  isCompleted && "text-pink-600"
              )}
          />
          {!isChapterPage ?
              <span
                  className={"font-[500] border-l border-l-neutral-300/60 pl-2 h-full flex items-center"}>
                {position} - {label}
              </span>
              :
              label
          }
        </div>
      </button>
  )
}