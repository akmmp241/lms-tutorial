import {Progress} from "@/components/ui/progress";
import {cn} from "@/lib/utils";

interface CourseProgressProps {
  value: number
  variant?: "default" | "success"
  size?: "default" | "sm" | "big"
}

const colorByVariant = {
  default: "text-black",
  success: "text-emerald-700"
}

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
  big: "text-lg",
}

export const CourseProgress = ({
    value,
    variant,
    size
}: CourseProgressProps) => {
  return (
      <div>
        <Progress
            className={"h-2"}
            value={value}
            variant={variant}
          />
        <p className={cn(
            "mt-2 text-sm text-black text-center",
        )}>
          <span className={"text-lg font-[600]"}>{Math.round(value)}%</span> COMPLETE
        </p>
      </div>
  )
}