import {NextResponse} from "next/server";
import {currentUser} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import {randomUUID} from "node:crypto";
import {Customer, Invoice} from "@/lib/xendit";

export async function POST(
    req: Request,
    {params}: { params: { courseId: string } }
) {
  try {
    const user = await currentUser()

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
      include: {
        category: true
      }
    })

    if (!course) return new NextResponse("Not Found", {status: 404})

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId
        }
      }
    })

    if (purchase) return new NextResponse("Already purchased", {status: 400})

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id
      },
      select: {
        stripeCustomerId: true
      }
    })

    if (!stripeCustomer) {
      const customer = await Customer.createCustomer({
        data: {
          referenceId: user.id,
          type: "INDIVIDUAL",
          individualDetail: {
            givenNames: user.fullName!
          },
          email: user.emailAddresses[0].emailAddress,
        }
      })

      await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        }
      })
    }

    const invoice = await Invoice.createInvoice({
      data: {
        externalId: `${randomUUID()}@${user.id}@${params.courseId}`,
        amount: course.price!,
        successRedirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}`,
        failureRedirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}`,
        currency: "IDR",
        items: [
          {
            name: course.title,
            quantity: 1,
            price: course.price!,
            category: course.category?.name!,
            url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${params.courseId}`,
          }
        ],
      }
    })

    return NextResponse.json({url: invoice.invoiceUrl})
  } catch (err) {
    console.error("[COURSE_ID_CHECKOUT]", err);
    return new NextResponse("Internal Server Error", {status: 500})
  }
}