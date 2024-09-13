import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getChapter} from "@/actions/get-chapter";
import {Banner} from "@/components/banner";
import {VideoPlayer} from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/video-player";
import {
  CourseEnrollButton
} from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-enroll-button";
import {Separator} from "@/components/ui/separator";
import {Preview} from "@/components/preview";
import Link from "next/link";
import {File} from "lucide-react";
import {
  CourseProgressButton
} from "@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/course-progress-button";

const ChapterIdPage = async ({params}: { params: { courseId: string, chapterId: string } }) => {
  const {userId} = auth()

  if (!userId) redirect(("/home"))

  const data = await getChapter({
    userId: userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  })

  if (!data?.chapter || !data.course) redirect("/home")

  const isLocked = !data.chapter.isFree && !data.purchase
  const completeOnEnd = !!data.purchase && !data.userProgress?.isCompleted

  return (
      <div>
        {data.userProgress?.isCompleted && (
            <Banner
                variant={"success"}
                label={"You already completed this chapter."}
            />
        )}
        {isLocked && (
            <Banner
                variant={"warning"}
                label={"You need to purchase this course to watch this chapter."}
            />
        )}
        <div className={"flex flex-col max-w-4xl mx-auto pb-20"}>
          <div className={"p-4"}>
            <VideoPlayer
                chapterId={params.chapterId}
                title={data.chapter.title}
                courseId={params.courseId}
                nextChapterId={data.nextChapter?.id}
                playbackId={data.muxData?.playbackId!}
                isLocked={isLocked}
                completeOnEnd={completeOnEnd}
            />
          </div>
          <div>
            <div className={"p-4 flex flex-col md:flex-row items-center justify-between"}>
              <h2 className={"text-2xl font-semibold mb-2"}>
                {data.chapter.title}
              </h2>
              {data.purchase ? (
                  <CourseProgressButton
                      chapterId={params.chapterId}
                      courseId={params.courseId}
                      nextChapterId={data.nextChapter?.id}
                      isCompleted={!!data.userProgress?.isCompleted}
                    />
              ) : (
                  <CourseEnrollButton
                      courseId={params.courseId}
                      price={data.course.price!}
                  />
              )}
            </div>
            <Separator/>
            <div>
              <Preview
                  value={data.chapter.description!}/>
            </div>
            {!!data.attachments.length && (
                <>
                  <Separator/>
                  <div className={"p-4"}>
                    {data.attachments.map(attachment => (
                        <Link
                            href={attachment.url}
                            target={"_blank"}
                            key={attachment.id}
                            className={"flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"}>
                          <File/>
                          <p className={"line-clamp-1"}>
                            {attachment.name}
                          </p>
                        </Link>
                    ))}
                  </div>
                </>
            )}
          </div>
        </div>
      </div>
  );
};

export default ChapterIdPage;