"use client"

import React from 'react';
import {useAuth, UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ArrowRight, ChevronLeft, ChevronRight, Home, LogOut} from "lucide-react";
import Link from "next/link";
import {SearchInput} from "@/components/search-input";
import {isTeacher} from "@/lib/teacher";
import {Chapter, Course, UserProgress} from "@prisma/client";

interface NavbarRoutesProps {
  nextChapterId: string
  previousChapterId: string | null
  courseId: string;
}

const NavbarRoutes = ({nextChapterId, previousChapterId, courseId}: NavbarRoutesProps) => {
  const {userId} = useAuth()
  const pathname = usePathname()

  const isCoursePage = pathname?.includes('/courses')
  const isChapterPage = pathname?.includes("/chapter")

  // const previous = course.chapters.filter(chapter => chapter?.userProgress![0].isCompleted);
  // const previousChapter = previous[previous.length - 1]

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
                      <Link href={`/courses/${courseId}/chapters/${previousChapterId}`}>
                        <Button>
                          <ChevronLeft />
                          Previous
                        </Button>
                      </Link>
                  )}
                  {nextChapterId && (
                      <Link href={`/courses/${courseId}/chapters/${nextChapterId}`}>
                        <Button>
                          Continue
                          <ChevronRight />
                        </Button>
                      </Link>
                  )}
                </div>
              </>
          )}
        </div>
      </>
  );
};

export default NavbarRoutes;