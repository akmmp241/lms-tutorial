import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import {isTeacher} from "@/lib/teacher";

export async function POST(req: Request, res: Response) {
  try {
    const {userId} = auth()
    const {title} = await req.json()

    if (!userId || !isTeacher(userId)) return new NextResponse("Unauthorized", {status: 401})

    const course = await db.course.create({
      data: {
        userId,
        title
      }
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error("[COURSES]", error)
    return new NextResponse("Internal error", {status: 500})
  }
}