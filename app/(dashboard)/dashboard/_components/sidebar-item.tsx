"use client"

import {LucideIcon} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
  isTeacher: boolean
}

export const SidebarItem = ({icon: Icon, label, href, isTeacher}: SidebarItemProps) => {
  const pathName = usePathname()
  const router = useRouter()

  let ref = href.split('/')
  ref.shift()

  const isActive =
      pathName === href ||
      pathName?.includes(ref[isTeacher ? 2 : 1] + '/')

  const handleClick = () => {
    router.push(href)
  }

  return (
      <button
          onClick={handleClick}
          type="button"
          className={cn(
              "h-full flex items-center gap-x-2 text-black text-sm font-[500] pl-6 transition-all hover:bg-neutral-500/20",
              isActive && "text-white bg-black hover:bg-neutral-800 m-3 rounded-md"
          )}
      >
        <div className={"flex items-center gap-x-2 py-4"}>
          <Icon
            size={22}
            className={cn(
                "text-black",
                isActive && "text-white hover:text-slate-600",
            )}
          />
          {label}
        </div>
      </button>
  )
}