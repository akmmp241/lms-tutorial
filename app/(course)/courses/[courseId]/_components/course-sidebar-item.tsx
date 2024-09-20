import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {LucideIcon} from "lucide-react";

interface CourseSidebarItemProps {
  label: string
  icon: LucideIcon,
  href: string,
  isActive: boolean
}

export const CourseSidebarItem = (
    {
      label,
      icon: Icon,
      href,
      isActive
    }: CourseSidebarItemProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push(href)
  }

  return (
      <button
          onClick={onClick}
          type="button"
          className={cn(
              "flex items-center gap-x-2 text-slate-500 w-full h-1/2 text-sm font-[500] transition-all hover:text-slate-600 hover:bg-slate-300/20",
              isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700"
          )}
      >
        <div
            className={cn(
                "opacity-0 border-2 border-slate-700 h-full transition-all mr-6",
                isActive && "opacity-100"
            )}
        />
        <div className={"flex items-center gap-x-2 h-10 my-0.5"}>
          <Icon
              size={22}
              className={cn(
                  "text-slate-500",
                  isActive && "text-slate-700"
              )}
          />
          <span className={"font-[500]"}>{label}</span>
        </div>
      </button>
  )
}