import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getDashboardCourses} from "@/actions/get-dashboard-courses";
import {CoursesList} from "@/components/courses-list";
import {Clock} from "lucide-react";
import {InfoCard} from "@/app/(old)/home/(routes)/(root)/_components/info-card";

export default async function Dashboard() {

  const {userId} = auth()

  if (!userId) redirect("/home")

  const {
    completedCourses,
    courseInProgress
  } = await getDashboardCourses(userId)

  return (
      <div className={"p-6 space-y-4"}>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
          <InfoCard
              icon={Clock}
              label="In Progress"
              numberOfItems={courseInProgress.length}
          />
          <InfoCard
              icon={Clock}
              label="Completed"
              numberOfItems={completedCourses.length}
              variant={"success"}
          />
        </div>
        <CoursesList
            items={[...completedCourses, ...courseInProgress]}/>
      </div>
  );
}
