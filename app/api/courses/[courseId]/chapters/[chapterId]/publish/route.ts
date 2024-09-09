import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string, chapterId: string}}
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

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId
      }
    })

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId
      }
    })

    if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl)
      return new NextResponse("Bad Request", {status: 401})

    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true
      }
    })

    return NextResponse.json(publishedChapter)
  } catch (error) {
    console.error("[CHAPTER_PUBLISH]", error)
    return new NextResponse("Internal Server Error", {status: 500})
  }
}