"use client"

import {Button} from "@/components/ui/button";
import {CheckCircle, XCircle} from "lucide-react";
import {useRouter} from "next/navigation";
import {useConfettiStore} from "@/hooks/use-confetti-store";
import {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {cn} from "@/lib/utils";

interface CourseProgressButtonProps {
  chapterId: string
  courseId: string
  isCompleted?: boolean
  nextChapterId?: string
}

export const CourseProgressButton = ({
                                       chapterId,
                                       courseId,
                                       isCompleted,
                                       nextChapterId,
                                     }: CourseProgressButtonProps) => {
  const router = useRouter()
  const confetti = useConfettiStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted
      })

      if (!isCompleted && !nextChapterId) confetti.onOpen()

      if (!isCompleted && nextChapterId) router.push(`/courses/${courseId}/chapters/${nextChapterId}`)

      toast.success("Progress updated")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const Icon = isCompleted ? XCircle : CheckCircle
  return (
      <Button
          onClick={onClick}
          disabled={isLoading}
          type={"button"}
          className={cn(
              "w-full md:w-auto border bg-pink-600 hover:bg-pink-900 border-pink-900",
          )}>
        <span className={"flex items-center gap-x-2 font-bold tracking-wider"}>
          {isCompleted ? "Not Completed" : "Mark as Completed"}
        </span>
        <Icon className={"h-4 w-4 ml-2"}/>
      </Button>
  )
}