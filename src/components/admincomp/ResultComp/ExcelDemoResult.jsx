import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllExams } from "@/hooks/tanstackHooks/useExam";
import { useGetStudentForResult } from "@/hooks/tanstackHooks/useResult";
import { excelDownload } from "@/lib/ExcelDownload";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function ExcelDemoResult() {
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const {mutate, isPending}=useGetStudentForResult()

  const { data } = useGetAllExams();

  const handleSelectExam = (value) => {
    setSelectedExamId(value);

    const exam = data?.data.find((item) => item.examScheduleId === value);
    setSelectedBatches(exam?.batches || []);

    // Reset batch & course ID when exam changes
    setSelectedBatchId("");
    setSelectedCourseId("");
  };

  const handleSelectBatch = (value) => {
    const batch = selectedBatches.find((b) => `${b.batchId}` === value);
    if (batch) {
      setSelectedBatchId(batch.batchId);
      setSelectedCourseId(batch.courseId);
    }
  };

  const handleCancel = ()=>{
    setSelectedExamId("")
    setSelectedBatches([])
    setSelectedBatchId("")
    setSelectedCourseId("")
  }

  const dlExcel = async ()=>{
    const data = [{admissionNumber:"", name:"", examName: "",studyCenterName: "", examCenterName: "",courseName: "",duration: "", dateOfExam:"", grade:"", remark: "", subjects: ""}]
    try{
      await excelDownload(data, "Result")
      toast.success("Excel downloaded successfully")
    }catch(err){
      toast.error(err.message)
    }
  }

  const handleSubmit = ()=>{
    const data = {examScheduleId:selectedExamId, courseId:selectedCourseId, batchId:selectedBatchId}
    mutate(data, {
        onSuccess: async (data) => {
            if(data.success){
                const rows = data?.data?.map((item) => ({
                    ...item,
                    dateOfExam: `${format(new Date(item?.dateOfExam?.from), "PPP")} - ${format(new Date(item?.dateOfExam?.to), "PPP")}`,
                    ...Object.fromEntries(data?.subjects?.map((field) => [field, ""])),
                  })).sort((a, b) => a.studyCenterName.localeCompare(b.studyCenterName))
                await excelDownload(rows, "Result")
                toast.success("Excel downloaded successfully")
                handleCancel()
            }else{
                toast.error(data.message)
            }
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
  }

  const instruc = [
    "Select A Exam from the first select tag",
    "Then select a course from the second select tag",
    "Click download button to download excel",
    "Fill all the required fields in excel to upload result",
    "Upload the excel file to upload result"
  ]

  return (
    <div className="border-t mt-5">
      <div className="my-5">
        <h1 className="font-medium">Download Excel</h1>
        <p className="text-muted-foreground text-sm">
          Select required fields and submit to download Excel for result
        </p>
      </div>

      <div>
        {instruc.map((item, i) =>{
            return <p className="text-sm text-muted-foreground" key={i}>{item}</p>
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-3">
        {/* Exam Select */}
        <Select onValueChange={handleSelectExam} value={selectedExamId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Exam" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Exams</SelectLabel>
              {data?.data?.map((item, i) => (
                <SelectItem key={i} value={item.examScheduleId}>
                  {item.examName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Batch/Course Select */}
        <Select
          onValueChange={handleSelectBatch}
          value={selectedBatchId || ""}
          disabled={!selectedBatches.length}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Courses</SelectLabel>
              {selectedBatches.map((item, i) => (
                <SelectItem key={i} value={item.batchId}>
                  {item.courseName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2 justify-self-end space-x-2">
        <Button
          size="sm"
          onClick={dlExcel}
          variant="outline"
        >
          Default Excel
        </Button>
        <Button
          size="sm"
          onClick={handleSubmit}
          variant=""
          disabled={!selectedExamId || !selectedBatchId}
        >
          {isPending ? <Loader2 className="animate-spin"/> : "Download Excel"}
        </Button>
      </div>
    </div>
  );
}

export default ExcelDemoResult;
