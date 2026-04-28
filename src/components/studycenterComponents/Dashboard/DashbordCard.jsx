import { CardComp } from "@/components/admincomp/AdminDashbord/DataCard";
import { BookOpen02Icon, Mortarboard02Icon } from "hugeicons-react";
import { Users } from "lucide-react";
import React from "react";

function DashbordCard({ data }) {
  return (
    <div className="w-full">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <CardComp
          Icon={Users}
          iconColor="text-blue-600 dark:text-blue-400"
          bgLight="bg-blue-50 dark:bg-blue-500/10"
          data={{
            head: "Total Students",
            count: data?.students,
            from: "All students registered at center"
          }}
        />
        <CardComp
          Icon={Mortarboard02Icon}
          iconColor="text-emerald-600 dark:text-emerald-400"
          bgLight="bg-emerald-50 dark:bg-emerald-500/10"
          data={{
            head: "This Year",
            count: data?.studentsOfCurrentYear,
            from: `Enrolled in ${new Date().getFullYear()}`
          }}
        />
        <CardComp
          Icon={BookOpen02Icon}
          iconColor="text-amber-600 dark:text-amber-400"
          bgLight="bg-amber-50 dark:bg-amber-500/10"
          data={{
            head: "Active Courses",
            count: data?.courses,
            from: "Courses available to enroll"
          }}
        />
      </div>
    </div>
  );
}

export default DashbordCard;
