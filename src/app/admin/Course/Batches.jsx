import { AddCourse } from "@/components/admincomp/courseComp/AddCourse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateCourse } from "@/hooks/tanstackHooks/useCourse";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { NewBatch } from "./NewBatch";
import { Button } from "@/components/ui/button";
import { useBatchesOfCourse } from "@/hooks/tanstackHooks/useBatch";
import Loader from "@/components/ui/loader";
import { useAuth } from "@/Context/authContext";
import { BookOpen, Tag, Clock, CalendarDays, ArrowLeft, Users, CalendarSync } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Batches({ data, subjects, setData }) {
  const [selected, setSelected] = useState([]);
  const [batch, setBatch] = useState([])
  const { mutate } = useUpdateCourse();
  const { user } = useAuth()
  const { data: batches, error, isLoading } = useBatchesOfCourse(data._id);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
    subjects: [],
  });

  useEffect(() => {
    setFormData({ ...formData, ...data });
    setSelected([...data.subjects]);
  }, [data]);

  useEffect(() => {
    if (batches?.data) {
      setBatch(batches.data)
    }
  }, [batches])

  const currentDate = batches?.currentDate

  const handleUpdateCourse = () => {
    mutate(
      { formData, id: data._id },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast("Course updated", {
              description: "Course updated successfully",
            });
            setData(data.data);
          } else {
            toast("Something went wrong", {
              description: data.message,
            });
          }
        },
      }
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground">{data.name}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm mt-4">
              <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border">
                <Tag className="w-4 h-4" />
                <span><span className="font-semibold text-foreground">Category:</span> {data.category}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border">
                <Clock className="w-4 h-4" />
                <span><span className="font-semibold text-foreground">Duration:</span> {data.duration}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start max-md:mt-2">
            <Button variant='outline' onClick={() => setData(null)} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            {user.isAdmin && (
              <AddCourse
                formData={formData}
                setFormData={setFormData}
                subject={subjects?.data}
                submit={handleUpdateCourse}
                type="edit"
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </div>
        </div>
      </div>

      {/* Batches Section */}
      <div className="rounded-2xl border bg-card/50 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
              <CalendarDays className="w-6 h-6 text-primary" />
              Available Batches
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Manage and view all batches for this course</p>
          </div>
          {user.isAdmin && <NewBatch id={data._id} name={data.name} />}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading ? (
            <div className="w-full flex justify-center py-12 col-span-full">
              <Loader />
            </div>
          ) : error ? (
            <div className="col-span-full py-12 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
              Error loading batches. Please try again later.
            </div>
          ) : batch?.length === 0 ? (
            <div className="col-span-full py-16 text-center border-2 border-dashed rounded-xl text-muted-foreground flex flex-col items-center justify-center gap-3">
              <CalendarSync className="w-12 h-12 text-muted-foreground/50" />
              <p>No batches available for this course yet.</p>
            </div>
          ) : (
            batch?.map((item, i) => {
              const currentDate2 = new Date(currentDate);
              const startDate = new Date(item.startDate);
              const endDate = new Date(item.endDate);

              const currentDateOnly = new Date(
                currentDate2.getFullYear(),
                currentDate2.getMonth(),
                currentDate2.getDate()
              );
              const startDateOnly = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate()
              );
              const endDateOnly = new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                endDate.getDate()
              );

              const isAdmissionOpened =
                item.isAdmissionStarted &&
                (startDateOnly <= currentDateOnly && endDateOnly >= currentDateOnly);
              const isScheduled = startDateOnly > currentDateOnly;

              return (
                <Card
                  onClick={() => setSelected(item)}
                  key={i}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-md border ${isAdmissionOpened ? "border-emerald-200/60  hover:border-emerald-400" : "hover:border-primary/40"
                    }`}
                >
                  <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> Batch {i + 1}
                    </CardTitle>
                    {isAdmissionOpened ? (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none font-medium text-xs">
                        Open
                      </Badge>
                    ) : isScheduled ? (
                      <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                        Scheduled
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-none">
                        Closed
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {item.month} Batch
                      </h3>
                      <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <span className={`font-semibold ${isAdmissionOpened ? "text-emerald-700" : isScheduled ? "text-blue-600" : "text-gray-600"
                          }`}>
                          {isAdmissionOpened ? "Admission Opened" : isScheduled ? "Upcoming" : "Admission Closed"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Batches;
