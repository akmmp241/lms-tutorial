import {cva, VariantProps} from "class-variance-authority";
import {Icon, LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";

const backgroundVariant = cva(
    "rounded-full flex items-center justify-center",
    {
      variants: {
        variant: {
          default: "bg-sky-100",
          success: "bg-emerald-100"
        },
        iconVariant: {
          default: "text-sky-700",
          success: "text-emerald-700"
        },
        size: {
          default: "p-2",
          sm: "p-1",
        }
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      }
    }
)

const iconVariants = cva(
    "",
    {
      variants: {
        variant: {
          default: "text-sky-700",
          success: "text-emerald-700"
        },
        size: {
          default: "h-8 w-8",
          sm: "h-4 w-4",
        }
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      }
    }
)

type BackgroundVariantProps = VariantProps<typeof backgroundVariant>
type IconVariantProps = VariantProps<typeof iconVariants>

interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
  icon: LucideIcon,
  className: string
}

export const IconBadge = (
    {
      icon: Icon,
      variant,
      size,
      className
    }: IconBadgeProps) => (
    <div className={cn(backgroundVariant({variant, size}), className)}>
      <Icon className={cn(iconVariants({variant, size}))}/>
    </div>
)