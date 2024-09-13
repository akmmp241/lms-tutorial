"use client"

import * as z from "zod"
import axios from "axios"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button";
import {File, Loader2, PlusCircle, X} from "lucide-react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Attachment, Course} from "@prisma/client";
import {FileUpload} from "@/components/file-upload";

interface AttachmentFormPros {
  initialData: Course & { attachments: Attachment[] }
  courseId: string
}

const formSchema = z.object({
  url: z.string().min(1)
})

export const AttachmentForm = ({initialData, courseId}: AttachmentFormPros) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleEdit = () => setIsEditing(current => !current)
  useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: initialData?.imageUrl || ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast.success("Course Updated")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  const onDelete = async ( id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success("Attachment deleted")
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setDeletingId(null)
    }
  }

  return (
      <div className={"mt-6 border bg-slate-100 rounded-md p-4"}>
        <div className={"font-medium flex items-center justify-between"}>
          Course attachments
          <Button onClick={toggleEdit} variant={"ghost"}>
            {isEditing && (
                <>
                  Cancel
                </>
            )}
            {!isEditing && (
                <>
                  <PlusCircle className={"h-4 w-4 mr-2"}/>
                  Add a file
                </>
            )}
          </Button>
        </div>

        {!isEditing && (
            <>
              {initialData.attachments.length === 0 && (
                  <p className={"text-sm mt-2 text-slate-500 italic"}>
                    No attachments yet
                  </p>
              )}
              {initialData.attachments.length > 0 && (
                  <div className={"space-y-2"}>
                    {initialData.attachments.map(attachment => (
                        <div
                            key={attachment.id}
                            className={"flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"}>
                          <File className={"h-4 w-4 mr-2 flex-shrink-0"}/>
                          <p className={"text-xs line-clamp-1"}>
                            {attachment.name}
                          </p>
                          <p className={"flex ml-2"}>
                            {deletingId === attachment.id && (
                                <div>
                                  <Loader2 className={"h-4 w-4 animate-spin"} />
                                </div>
                            )}
                            {deletingId !== attachment.id && (
                                <button
                                    onClick={() => onDelete(attachment.id)}
                                    className={"ml-auto hover:opacity-75 transition h-fit"}>
                                  <X className={"h-4 w-4"} />
                                </button>
                            )}
                          </p>
                        </div>
                    ))}
                  </div>
              )}
            </>
        )}

        {isEditing && (
            <div>
              <FileUpload
                  endpoint="courseAttachment"
                  onChange={(url) => {
                    if (url) return onSubmit({url: url})
                  }}
              />
              <div className={"text-xs text-muted-foreground mt-4"}>
                Add anything your student might need to complete the course.
              </div>
            </div>
        )}
        </div>
   )
}