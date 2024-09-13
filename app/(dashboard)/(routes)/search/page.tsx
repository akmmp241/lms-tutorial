import React from 'react';
import {db} from "@/lib/db";
import {Categories} from "@/app/(dashboard)/(routes)/search/_components/categories";
import {SearchInput} from "@/components/search-input";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getCourses} from "@/actions/get-courses";
import {CoursesList} from "@/components/courses-list";

interface SearchPageProps {
  searchParams: {
    title: string,
    categoryId: string,
  }
}

const SearchPage = async ({searchParams}: SearchPageProps) => {
  const {userId} = auth()

  if (!userId) redirect('/')

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  const courses = await getCourses({
    userId,
    ...searchParams
  })

  console.info(courses)

  return (
      <>
        <div className={"px-6 pt-6 md:hidden md:mb-0 block"}>
          <SearchInput />
        </div>
        <div className={"p-6 space-y-4 "}>
          <Categories
              items={categories}
          />
          <CoursesList items={courses} />
        </div>
      </>
  );
};

export default SearchPage;