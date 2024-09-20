"use client"

import Link from "next/link";
import Image from "next/image";
import {IconBadge} from "@/components/icon-badge";
import {BookOpen} from "lucide-react";
import {formatPrice} from "@/lib/format";
import {CourseProgress} from "@/components/course-progress";

interface CourseCardProps {
  id: string
  title: string
  imageUrl: string
  chaptersLength: number
  price: number
  progress: number
  description: string
}

export const CourseCard = (
    {
      id,
      title,
      imageUrl,
      chaptersLength,
      price,
      progress,
      description
    }: CourseCardProps) => {
  return (
        <div className={"group hover:shadow-sm transition overflow-hidden border bg-neutral-200/40 rounded-lg h-full p-3"}>
          <div className={"relative w-full aspect-video rounded-md overflow-hidden"}>
            <Image
                fill
                className={"object-cover"}
                src={imageUrl}
                alt={title}/>
          </div>
          <div className={"flex flex-col pt-2"}>
            <div className={""}>
              <span className={"text-lg md:text-xl font-bold line-clamp-2"}>{title}</span>
              <p className={"text-neutral-500 text-base truncate w-2/3"}>
                {description}
              </p>
            </div>
            <div className={"my-3 flex items-center gap-x-2 text-sm md:text-xs"}>
            <div className={"flex items-center gap-x-1 text-black"}>
                <IconBadge className={"fill-neutral-900"} size={"sm"} icon={BookOpen} variant={'default'}/>
                <span>
                  {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                </span>
              </div>
            </div>
            {progress !== null ? (
                <div>
                  <CourseProgress
                      value={progress}
                      size={"sm"}
                      variant={progress === 100 ? "success" : "default"}
                  />
                </div>
            ) : (
                <p className={"text-base md:text-sm font-medium text-slate-700"}>
                  {formatPrice(price)}
                </p>
            )}
          </div>
        </div>
  )
}