import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Calendar03Icon,
  Location06Icon,
  NoteEditIcon,
  Time04Icon,
} from "hugeicons-react";
import React from "react";
import { format } from "date-fns";


function AllExams({ data }) {
  // Transform the data to match the component's expected structure
  const transformedData = data.flatMap(exam => 
    exam.batches.map(batch => ({
      ...exam,
      from: exam.examDate.from,
      to: exam.examDate.to,
      examCenter: exam.location,
      courseId: {
        name: batch.courseName
      },
      batchId: batch.batchMonth, // Using batchMonth instead of batchId for display
      batchMonth: batch.batchMonth // Adding this if needed elsewhere
    }))
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:grid-cols-4">
        {transformedData.map((item, index) => {
          return (
            <Card key={index} className="shadow-none rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3 border-b-2 ">
                <CardTitle className="text-lg font-bold text-pry">
                  {item.examName}
                </CardTitle>
                <CardDescription>{item.courseId.name}</CardDescription>
                <CardAction>
                  <NoteEditIcon size={20} className="text-muted-foreground" />
                </CardAction>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Date and Time Section */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Calendar03Icon size={20} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Exam Period
                      </p>
                      <p className="text-sm ">
                        {format(new Date(item.from), "PPP")} -{" "}
                        {format(new Date(item.to), "PPP")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Time04Icon size={20} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">Time</p>
                      <p className="text-sm ">
                        {item.examTime.from} - {item.examTime.to}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Location06Icon size={20} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Exam Center
                      </p>
                      <p className="text-sm ">{item.examCenter}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-4 px-4 divide-x bg-muted py-2 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Batch</p>
                    <p className="text-sm font-medium">{item.batchId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Year</p>
                    <p className="text-sm font-medium">{item.year}</p>
                  </div>
                </div>
              </CardContent>
              {/* <CardFooter>
                <Button
                  variant=""
                  className="w-full shadow-none rounded-full cursor-pointer"
                >
                  Apply for Exam
                </Button>
              </CardFooter> */}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default AllExams;
