import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import {isTeacher} from "@/lib/teacher";

export async function DELETE(
    req: Request,
    {params}: {params: {courseId: string, attachmentId: string}}
) {
  try {
    const {userId} = auth()

    if (!userId) return new NextResponse("Unauthorized", {status: 401})

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId
      }
    })

    if (!courseOwner) return new NextResponse("Unauthorized", {status: 401})

    const attachment = await db.attachment.delete({
      where: {
        id: params.attachmentId,
        courseId: courseOwner.id
      }
    })

    return NextResponse.json({message: "success"})
  } catch (error) {
    console.error("ATTACHMENT_ID", error);
    return new NextResponse("Internal Server Error", {status: 500})
  }
}