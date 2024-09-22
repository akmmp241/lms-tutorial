"use client"

import React from 'react';
import {useAuth, UserButton} from "@clerk/nextjs";
import {redirect, usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ArrowRight, ChevronLeft, ChevronRight, Home, LogOut} from "lucide-react";
import Link from "next/link";
import {SearchInput} from "@/components/search-input";
import {isTeacher} from "@/lib/teacher";
import {Chapter, Course, UserProgress} from "@prisma/client";
import path from "node:path";
import {getChapter} from "@/actions/get-chapter";

interface NavbarRoutesProps {
  nextChapterId: string
  previousChapterId: string
  courseId: string;
}

const NavbarRoutes = ({nextChapterId, previousChapterId, courseId}: NavbarRoutesProps) => {
  const {userId} = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  if (!userId) redirect('/dashboard')

  const isCoursePage = pathname?.includes('/courses')
  const isChapterPage = pathname?.includes("/chapter")
  let isNextDisabled = false
  let isPreviousDisabled = false

  if (isChapterPage) {
    const path = pathname.split("/")
    isNextDisabled = isChapterPage && nextChapterId === path[path.length - 1]
    isPreviousDisabled = isChapterPage && previousChapterId === path[path.length - 1]
    console.info(previousChapterId)
  }

  return (
      <>
        <div className={"w-full flex items-center justify-between"}>
          {isCoursePage && !isChapterPage && (
              <>
                <Link href={isChapterPage ? `/courses/${courseId}` : "/dashboard"}>
                  <ChevronLeft className={"h-6 w-6 mr-2 stroke-white"}/>
                </Link>
                <UserButton/>
              </>
          )}
          {isChapterPage && (
              <>
                <Link href={isChapterPage ? `/courses/${courseId}` : "/dashboard"}>
                  <Home className={"h-5 w-5 stroke-white"}/>
                </Link>
                <div className={"flex gap-x-4"}>
                  {previousChapterId && (
                      <Button
                          className={"bg-transparent border border-violet-500 hover:bg-violet-800"}
                          disabled={isPreviousDisabled}>
                        <Link className={"flex items-center gap-x-2 font-bold tracking-wider"}
                              href={`/courses/${courseId}/chapters/${previousChapterId}`}>
                          <ChevronLeft/>
                          Previous Chapter
                        </Link>
                      </Button>
                  )}
                  {nextChapterId && (
                      <Button
                          className={"bg-pink-600 hover:bg-pink-900 border border-pink-900"}
                          disabled={isNextDisabled}>
                        <Link className={"flex items-center gap-x-2 font-bold tracking-wider"}
                            href={`/courses/${courseId}/chapters/${nextChapterId}`}>
                          Continue Chapter
                          <ChevronRight/>
                        </Link>
                      </Button>
                  )}
                </div>
              </>
          )}
        </div>
      </>
  );
};

export default NavbarRoutes;