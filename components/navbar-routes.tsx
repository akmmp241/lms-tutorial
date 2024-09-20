"use client"

import React from 'react';
import {useAuth, UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ArrowRight, ChevronLeft, LogOut} from "lucide-react";
import Link from "next/link";
import {SearchInput} from "@/components/search-input";
import {isTeacher} from "@/lib/teacher";

const NavbarRoutes = () => {
  const {userId} = useAuth()
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith("/home/teacher")
  const isCoursePage = pathname?.includes('/courses')
  const isSearchPage = pathname?.includes('/search')
  const isChapterPage = pathname?.includes("/chapter")

  return (
      <>
        {/*{isSearchPage && (*/}
        {/*    <div className={"hidden md:block"}>*/}
        {/*      <SearchInput />*/}
        {/*    </div>*/}
        {/*)}*/}

        <div className={"w-full flex items-center justify-between"}>
          {isTeacherPage || isCoursePage ? (
              <Link href={"/dashboard"}>
                  <ChevronLeft className={"h-6 w-6 mr-2 stroke-white"}/>
              </Link>
          ) : isTeacher(userId) ? (
              <Link href={"/dashboard/teacher/courses"}>
                <Button className={"flex items-center"} size={"sm"} variant={"default"}>
                  Teacher Mode
                </Button>
              </Link>
          ) : null}
          <UserButton
          />
        </div>
      </>
  );
};

export default NavbarRoutes;