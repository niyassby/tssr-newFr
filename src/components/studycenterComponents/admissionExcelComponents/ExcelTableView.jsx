// ExcelTableView.jsx
import { useEffect, useState } from "react";
import { ExcelTableLayout } from "./ExcelTableLayout";
import { FileUploadDialog } from "./FileUploadDialog";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBulkEnrollStudents } from "@/hooks/tanstackHooks/useEnrollment";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function ExcelTableView({ tableData, course, onBack, isSaved }) {
  const [newStudents, setNewStudents] = useState([]);
  const [isAccept, setAccept]=useState(false)
  const [pendingEnrollmentStudents, setPendingEnrollmentStudents] = useState(
    []
  );
  const [unavailableStudents, setUnavailableStudents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [row, setRow] = useState(null);
  const { mutate, isPending } = useBulkEnrollStudents();
  
  function handleUploadClick(row) {
    setRow(row);
    setDialogOpen(true);
  }
  useEffect(() => {
    if (!tableData) return;

    setNewStudents(tableData.newStudents || []);
    setPendingEnrollmentStudents(tableData.pendingEnrollmentStudents || []);
    setUnavailableStudents(tableData.unavailableStudents || []);
  }, [tableData]);
  
  const handleSubmit = () => {
    if (!isAccept) {
      toast.warning("Please accept the terms and conditions.");
      return;
    }

const allValid = newStudents.every(
  (student) => student?.profileImage && student?.sslc
);


    if (!allValid) {
      toast.warning(
        "Please upload profile image and SSLC file for all students."
      );
      return;
    }
  
    mutate(
      { newStudents, pendingEnrollmentStudents, course },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success("Students enrolled successfully.");
            setNewStudents([]);
            setPendingEnrollmentStudents([]);
            setUnavailableStudents([]);
            if(isSaved) {localStorage.removeItem("studentData");}
            onBack();
          } else {
            toast.error(res.message);
          }
        },
        onError: (err) => {
          toast.error("Error occurred while enrolling students.");
        }
      }
    );
  };

  const handelSaveData = ()=>{
    if(newStudents.length === 0 && pendingEnrollmentStudents.length === 0){
      // console.log();
      toast.warning("No students to save.")
      return
    }
    localStorage.setItem("studentData", JSON.stringify({newStudents, pendingEnrollmentStudents, course}))
    toast.success("Data saved successfully.")
    
  }

  const inst = [
    {
      head: "New Students",
      items: [
        "Shows students who are newly approved for admission.",
        "You must upload their photo and SSLC certificate here."
      ]
    },
    {
      head: "Available Students",
      items: [
        "Lists students whose data already exists and are approved for admission.",
      ]
    },
    {
      head: "Invalid Students",
      items: [
        "Contains student records that were rejected for admission.",
        "The reason for rejection will be displayed here."
      ]
    },
  ]

  return (
    <>
      <div className="">
        <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-700">Students Data</h1>
        <Button size='icon' variant='outline' onClick={onBack}>
          <ArrowLeft/>
        </Button>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full border-b "
          
        >
      <AccordionItem value="item-1">
        <AccordionTrigger>Click to view Instructions</AccordionTrigger>
        <AccordionContent className=" space-y-1">
          
          <h1 className="text-base font-semibold">You can view all uploaded student data in the following tables:</h1>
          {inst.map((item, index) =>{
            return (
              <div className="mt-2" key={index}>
                <div className="flex items-center space-x-2">

                <Check size={16}/>
                <h1 className="text-base font-semibold text-gray-700 ">{item.head}</h1>
                </div>
                {item.items.map((item, index) => {
                  return (
                    <p key={index} className="text-sm  text-gray-600">
                      - {item}
                    </p>
                  );
                })}
              </div>
            )
          })}
          <h1 className="text-base font-semibold mt-5">After uploading all required files for a student, you must</h1>
          <div className="text-gray-600">
          <p>Ensure all uploaded files are clear and correct.</p>
          <p>Double-check that student information matches the documents.</p>
          <p>Read and agree the Student Declaration.</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      </div>
      <div className="py-4 space-y-8">
        {newStudents.length > 0 && (
          <ExcelTableLayout
            title="New Students"
            students={newStudents}
            enableUpload={true}
            onEditClick={handleUploadClick}
          />
        )}
        {row && (
          <FileUploadDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            student={row}
            setNewStudents={setNewStudents}
            newStudents={newStudents}
            setRow={() => setRow(null)}
          />
        )}
        {pendingEnrollmentStudents.length > 0 && (
          <ExcelTableLayout
            title="Available Students"
            enableUpload={false}
            students={pendingEnrollmentStudents}
          />
        )}

        {unavailableStudents.length > 0 && (
          <ExcelTableLayout
            title="Invalid Students"
            students={unavailableStudents}
            isError={true}
          />
        )}
        {/* Terms and Submit */}
        {(newStudents.length > 0 || pendingEnrollmentStudents.length > 0) && (
          <div>
            <div className="mt-5 border-t py-4">
              <h1 className="text-lg font-semibold text-gray-700 ">
                Student,s Declaration
              </h1>
              <p className="text-sm text-gray-600 mt-1 max-w-4xl">
                Hereby solemnly declare that the above information provided by
                me are true to the best of my knowledge and belief. I shall obey
                the rules and regulation of TSSR COUNCIL study centre, now in
                force and as amended or altered from time to time. I accept all
                decision of the TSSR COUNCIL authorities in all matters of
                training conducted discipline are no right of question them in
                any court of law.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Checkbox
                  id="checkbox"
                  checked={isAccept}
                  onCheckedChange={(value) => setAccept(value)}
                />
                <Label htmlFor="checkbox">
                  I agree to the declaration above.
                </Label>
              </div>
            </div>

            <div className="flex gap-3 justify-end mb-6">
              <Button variant={"outline"} onClick={onBack}>
                Back
              </Button>
              <Button variant={"outline"} onClick={handelSaveData}>
                Save Data
              </Button>
              <Button disabled={!isAccept} onClick={handleSubmit} className="">
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit Data"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
