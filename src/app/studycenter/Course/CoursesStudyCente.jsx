import Courses from '@/app/admin/Course/Courses'
import { RequestCourse } from '@/components/studycenterComponents/CourseComp/RequestCourse'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestListCenter from '@/components/studycenterComponents/CourseComp/RequestListCenter';

function CoursesStudyCente() {
  return (
    <div>
        <div className='flex max-sm:flex-col gap-5 justify-between'>
            <h1 className='text-2xl font-bold'>Course of Center</h1>
            <RequestCourse/>
        </div>
        <div>
          
          <Tabs defaultValue="Active" className="w-full mt-5">
        <TabsList className="h-11 space-x-2 bg-transparent">
          <TabsTrigger
            className="bg-muted px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="Active"
          >
            Availabel
          </TabsTrigger>
          <TabsTrigger
            className="bg-muted px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="schedule"
          >
            Request
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Active">
        <Courses/>
        </TabsContent>
        <TabsContent value="schedule">
          <RequestListCenter/>
        </TabsContent>
      </Tabs>
        </div>
    </div>
  )
}

export default CoursesStudyCente