import {
  BookOpen02Icon,
  Mortarboard02Icon,
  UserAdd01Icon,
} from "hugeicons-react";
import React from "react";
import { Building2 } from "lucide-react";

function DataCard({ data }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <CardComp
        data={{ head: "Total Students", count: data?.totalEnrollments, from: "All time registrations" }}
        iconColor="text-blue-600 dark:text-blue-400"
        bgLight="bg-blue-50 dark:bg-blue-500/10"
        Icon={UserAdd01Icon}
      />
      <CardComp
        data={{
          head: "This Year",
          count: data?.totalEnrollmentInThisYear,
          from: `Students in ${new Date().getFullYear()}`,
        }}
        iconColor="text-emerald-600 dark:text-emerald-400"
        bgLight="bg-emerald-50 dark:bg-emerald-500/10"
        Icon={Mortarboard02Icon}
      />
      <CardComp
        data={{
          head: "Study Centers",
          count: data?.totalStudyCenters,
          from: "Registered centers",
        }}
        iconColor="text-purple-600 dark:text-purple-400"
        bgLight="bg-purple-50 dark:bg-purple-500/10"
        Icon={Building2}
      />
      <CardComp
        data={{ head: "Total Courses", count: data?.totalCourses, from: "Available to enroll" }}
        iconColor="text-amber-600 dark:text-amber-400"
        bgLight="bg-amber-50 dark:bg-amber-500/10"
        Icon={BookOpen02Icon}
      />
    </div>
  );
}

export default DataCard;

export function CardComp({ data, Icon, iconColor, bgLight }) {
  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 p-6 group">
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${bgLight} transition-transform duration-500 group-hover:scale-150`}></div>
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {data.head}
            </p>
            <h3 className="text-3xl font-bold text-foreground">
              {data.count || 0}
            </h3>
          </div>
          <div className={`p-3 rounded-xl ${bgLight} flex items-center justify-center shrink-0`}>
            <Icon size={24} className={iconColor} strokeWidth={2} />
          </div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground font-medium">
          {data.from}
        </div>
      </div>
    </div>
  );
}
