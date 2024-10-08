import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {isTeacher} from "@/lib/teacher";
import {redirect} from "next/navigation";

const TeacherLayout = ({children}: {children: React.ReactNode}) => {
  const {userId} = auth()

  if (!isTeacher(userId)) return redirect("/home")

  return (
      <>{children}</>
  );
};

export default TeacherLayout;