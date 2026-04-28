import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExcelTableView } from "./ExcelTableView";
import { useCreateEnrollmentUsingExcel } from "@/hooks/tanstackHooks/useEnrollment";
import { excelToJson, jsonToExcel } from "@/lib/excelToJson";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";
import { LoaderCircle, LoaderIcon } from "lucide-react";
import { CloudUploadIcon } from "hugeicons-react";

const ExcelUpload = ({ onBack, setCourse, course }) => {
  const [file, setFile] = useState(null);
  const { mutate, isPending } = useCreateEnrollmentUsingExcel();
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [translate, setTranslate] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel")
    ) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a valid Excel file.");
      toast.warning("Please select a valid Excel file");
      return;
    }

    const data = await excelToJson(file);
    mutate({data, course}, {
      onSuccess: (res) => {
        if (res.success) {
          setTableData(res);
          toast.success("Excel data uploaded successfully.");
        } else toast.error("Failed to upload Excel data.");
      },
    });
  };
  function handleCancel() {
    setFile(null);
    setTableData([]);
    setError(null);
    setCourse(null);
    onBack();
  }
  const instruction = [
    "Download the demo Excel file below.",
    "Enter all required student details in the same format.",
    "Make sure dates are in the format DD-MM-YYYY, eg: 30-12-2023.",
    "Do not rename or modify any column headers.",
    "Upload the completed Excel file and wait for the upload to finish.",
    "On successful upload, you'll be redirected to the next step.",
    "Review the uploaded data in the table.",
    "Upload each student's photo and SSLC certificate.",
    "Submit the final form.",
  ];
  const malayalam = [
    "താഴെയുള്ള ഡെമോ എക്സൽ ഫയൽ ഡൗൺലോഡ് ചെയ്യുക",
    "ആവശ്യമായ എല്ലാ വിദ്യാർത്ഥി വിശദാംശങ്ങളും അതേ ഫോർമാറ്റിൽ നൽകുക.",
    "തീയതികൾ DD-MM-YYYY എന്ന ഫോർമാറ്റിലാണെന്ന് ഉറപ്പാക്കുക, ഉദാ: 30-12-2023.",
    "കോളം ഹെഡറുകളുടെ പേരുമാറ്റുകയോ പരിഷ്കരിക്കുകയോ ചെയ്യരുത്",
    "പൂർത്തിയാക്കിയ എക്സൽ ഫയൽ അപ്‌ലോഡ് ചെയ്ത് പൂർത്തിയാകുന്നതുവരെ കാത്തിരിക്കുക.",
    "അപ്‌ലോഡ് വിജയകരമായാൽ അടുത്ത ഘട്ടത്തിലേക്ക് റീഡയറക്‌ട് ചെയ്യും.",
    "പട്ടികയിലെ അപ്‌ലോഡ് ചെയ്‌ത ഡാറ്റ അവലോകനം ചെയ്യുക.",
    "ഓരോ വിദ്യാർത്ഥിയുടെയും ഫോട്ടോയും SSLC സർട്ടിഫിക്കറ്റും അപ്‌ലോഡ് ചെയ്യുക.",
    "ഫോം സബ്മിറ്റ് ചെയ്യുക.",
  ];

  let excelCol = ["name", "age", "dateOfBirth", "gender", "phoneNumber", "place", "houseName", "district", "state", "pincode", "email", "adhaarNumber", "parentName","qualification" ]

  return (
    <div>
      {tableData.length >= 0 ? (
        <Card className="w-full max-w-5xl mx-auto bg-background border  rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Upload Student Data
            </CardTitle>
            <CardDescription>
              Easily upload student details in bulk using an Excel file
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-1">
              <h1 className="text-xl font-medium mb-2">Instruction</h1>
              {!translate
                ? instruction.map((item, index) => {
                    return (
                      <p key={index} className="  text-muted-foreground ">
                        {index + 1}. {item}
                      </p>
                    );
                  })
                : malayalam.map((item, index) => {
                    return (
                      <p key={index} className=" text-muted-foreground malayalam-font">
                        {index + 1}. {item}
                      </p>
                    );
                  })}
              <button
                className="cursor-pointer text-sm text-muted-foreground"
                onClick={() => setTranslate(!translate)}
              >
                Translate to {translate ? "English" : "Malayalam"}
              </button>
            </div>
            <div className="f lex items-center justify-between mt-6">
              <div className="flex flex-col space-y-1.5">
                <input
                  id="excel"
                  type="file"
                  className="sr-only"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="excel"
                  className={`${
                    error ? "border-red-500" : ""
                  } w-full py-7 border flex flex-col gapy-2 cursor-pointer hover:border-primary transition-all duration-200 hover:bg-muted items-center justify-center border-dashed border-gray-300 p-4 rounded-xl`}
                >
                  <CloudUploadIcon strokeWidth={1} />
                  <h1 className="text-sm font-medium text-gray-600">
                    Upload Excel File{" "}
                  </h1>
                  <p className="text-xs text-gray-500">
                    Only .xlsx, .xls and .csv files are accepted
                  </p>
                </label>
                {file && (
                  <p className="text-sm text-green-600">
                    Uploaded: {file.name}
                  </p>
                )}
                {error && (
                  <p className="text-sm text-red-600">
                    Please select a valid Excel file.
                  </p>
                )}
              </div>
              <div className="flex max-sm:flex-col sm:justify-between gap-2 mt-5">
                <Button
                  variant="secondary"
                  className="hover:text-primary"
                  onClick={() =>
                    
                    jsonToExcel( excelCol,"demo.xlsx")
                  }
                >
                  Download Demo Excel
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className={"w-full"}
                    onClick={handleCancel}
                  >
                    Back
                  </Button>
                  <Button onClick={handleUpload} className="w-full">
                    {isPending ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Upload Excel"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3"></CardFooter>
        </Card>
      ) : isPending ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <ExcelTableView tableData={tableData} course={course} onBack={()=>setTableData([])} />
      )}
    </div>
  );
};

export default ExcelUpload;
