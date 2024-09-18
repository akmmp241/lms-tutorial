"use client"

import React from 'react';
import {useAuth, UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ArrowRight, LogOut} from "lucide-react";
import Link from "next/link";
import {SearchInput} from "@/components/search-input";
import {isTeacher} from "@/lib/teacher";

const NavbarRoutes = () => {
  const {userId} = useAuth()
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith("/home/teacher")
  const isCoursePage = pathname?.includes('/courses')
  const isSearchPage = pathname?.includes('/search')

  return (
      <>
        {isSearchPage && (
            <div className={"hidden md:block"}>
              <SearchInput />
            </div>
        )}
        <div className={"flex items-center gap-x-4 ml-auto"}>
          {isTeacherPage || isCoursePage ? (
              <Link href={"/home"}>
                <Button size={"sm"} variant={"default"}>
                  <LogOut className={"h-4 w-4 mr-2"}/>
                  Exit
                </Button>
              </Link>
          ) : isTeacher(userId) ? (
              <Link href={"/dashboard//teacher/courses"}>
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