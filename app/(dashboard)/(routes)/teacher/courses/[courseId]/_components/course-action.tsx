"use client"

import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {ConfirmModal} from "@/components/modals/confirm-modal";
import {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useConfettiStore} from "@/hooks/use-confetti-store";

interface CourseActionsProps {
  disabled: boolean
  courseId: string
  isPublished: boolean
}

export const CourseActions = ({disabled, courseId, isPublished}: CourseActionsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const confetti = useConfettiStore()

  const onPublish = async () => {
    try {
      setIsLoading(true)

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success("Course unpublished")
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success("Course published")
        confetti.onOpen()
      }

      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/courses/${courseId}`)

      toast.success("Course deleted")
      router.push(`/teacher/courses`)
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className={"flex items-center gap-x-2"}>
        <Button
            onClick={onPublish}
            disabled={disabled || isLoading}
            variant={"outline"}
            size={"sm"}>
          {isPublished ? "Unpublish" : "Publish"}
        </Button>
        <ConfirmModal onConfirm={onDelete}>
          <Button size={"sm"} disabled={isLoading}>
            <Trash className={"h-4 w-4"} />
          </Button>
        </ConfirmModal>
      </div>
  )
}