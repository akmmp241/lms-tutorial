import React from 'react';
import {DataTable} from "@/app/(dashboard)/home/(routes)/teacher/courses/_components/data-table";
import {columns} from "@/app/(dashboard)/home/(routes)/teacher/courses/_components/columns";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";

const CoursesPage = async () => {
  const {userId} = auth()

  if (!userId) redirect('/home')

  const courses = await db.course.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
      <div className={"p-6"}>
        <DataTable columns={columns} data={courses} />
      </div>
  );
};

export default CoursesPage;