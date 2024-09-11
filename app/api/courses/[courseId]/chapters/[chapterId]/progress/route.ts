import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export async function PUT(
    req: Request,
    {params}: { params: { courseId: string, chapterId: string } }
) {
  try {
    const {userId} = auth()
    const {isCompleted} = await req.json()

    if (!userId) return new NextResponse("Unauthorized", {status: 401})

    const userProgress = await db.userProgress.upsert({
      where: {
        chapterId_userId: {
          userId: userId,
          chapterId: params.chapterId,
        }
      },
      update: {
        isCompleted: isCompleted,
      },
      create: {
        userId: userId,
        chapterId: params.chapterId,
        isCompleted: isCompleted
      }
    })

    return NextResponse.json(userProgress)
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Server Error", {status: 500})
  }
}