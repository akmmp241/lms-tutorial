import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function POST(req: Request) {
  const callback = await req.json()
  const signature = headers().get("x-callback-token") as string

  if (signature !== process.env.XENDIT_CALLBACK_TOKEN)
    return new NextResponse(`Unauthorized`, {status: 401})

  const userId = callback.external_id.split("@")[1]
  const courseId = callback.external_id.split("@")[2]

  if (callback.status === "PAID") {
    if (!userId || !courseId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {status: 400})
    }

    await db.purchase.create({
      data: {
        courseId: courseId,
        userId: userId
      }
    })
  } else {
    return new NextResponse(`Webhook Error: Unhandled event type`, {status: 200})
  }

  return new NextResponse(null, {status: 200})
}