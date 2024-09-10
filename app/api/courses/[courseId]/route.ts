import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string}}
) {
  try{
    const { userId } = auth()
    const { courseId } = params
    const values = await req.json()

    if (!userId) return new NextResponse("Unauthorized", {status: 401})

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error("[COURSE_ID]", error)
    return new NextResponse("Internal Server Error", {status: 500})
  }
}

export async function DELETE(
    req: Request,
    {params}: {params: {courseId: string}}
) {
  try {
    const {userId} = auth()

    if (!userId) return new NextResponse("Unauthorized", {status: 401})

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId
      },
      include: {
        chapters: {
          include: {
            muxData: true
          }
        }
      }
    })

    if (!course) return new NextResponse("Not Found", {status: 404})

    for (let chapter of course.chapters) if (chapter.muxData?.assetId) await mux.video.assets.delete(chapter.muxData.assetId)

    await db.course.delete({
      where: {
        id: params.courseId
      }
    })

    return new NextResponse("Success", {status: 200})
  } catch (e) {
    console.error("[COURSE_ID_DELETE]", e)
    return new NextResponse("Internal Server Error", {status: 500})
  }
}