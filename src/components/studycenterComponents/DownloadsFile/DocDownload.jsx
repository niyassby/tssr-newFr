import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download04Icon } from "hugeicons-react";
import { Loader2, XIcon } from "lucide-react";
import { toast } from "sonner";

import SelectDropDown from "./SelectDropDown";
import PDFDesign from "./PDFDesign";
import { useReactToPrint } from "react-to-print";
import { useStudentForDl } from "@/hooks/tanstackHooks/useStudents";
import { useSettings } from "@/hooks/tanstackHooks/useAuth";
import { excelDownload } from "@/lib/ExcelDownload";
import { Input } from "@/components/ui/input";

export function DocDownload({ name, fields= [], mark, date, isLong }) {
  const contentRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [error, setError] = useState(null);
  const [loadingType, setLoadingType] = useState(null); // 'pdf' | 'excel'
  const [filters, setFilters] = useState({
    course: "",
    batch: "",
    year: "",
    studycenterId: "",
  });

  const { isPending, mutateAsync } = useStudentForDl();

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: name,
    pageStyle: `
    @media print {
      @page {
        margin: 32px;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        @bottom-right {
          content: "Page " counter(pages);
          font-size: 9pt;
          color: #999;
        }
      }
      body {
        margin: 0;
      }
    }
  `,
  });

  useEffect(() => {
    if (!isOpen) {
      setFilters({ course: "", batch: "", year: "" });
      setError(null);
      setPdfData(null);
    }
  }, [isOpen]);

  const validateFilters = () => {
    if (!filters.course || !filters.batch || !filters.year) {
      setError("Please select all filters");
      return false;
    }
    return true;
  };

  const fetchData = async () => {
    return mutateAsync({
      courseId: filters.course,
      batchId: filters.batch,
      year: filters.year,
      studyCenter: filters.studycenterId,
      fields: ["name", "admissionNumber", "studentId"],
    });
  };

  const handleDownloadPDF = async () => {
    if (!validateFilters()) return;
    setLoadingType("pdf");
    try {
      const result = await fetchData();

      if (!result.success || result.data.length === 0) {
        const msg = result.message || "No data found";
        toast.error(msg);
        setError(msg);
        return;
      }

      setPdfData(result);

      setTimeout(() => {
        handlePrint();
      }, 200); // Delay to allow DOM update
      // setFilters({ course: "", batch: "", year: "" });
      setError(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setError("Something went wrong");
    } finally {
      setLoadingType(null);
    }
  };

  const handleDownloadExcel = async () => {
    // return console.log(courseName);
    if (!validateFilters()) return;
    setLoadingType("excel");

    try {
      const result = await fetchData();
      if (!result.success || result.data.length === 0) {
        const msg = result.message || "No data found";
        toast.error(msg);
        setError(msg);
        return;
      }
      const centerName = result.studycenterName

      const rows = result?.data?.map((item) => ({
        "Admission Number": item.admissionNumber,
        "Student ID": item.studentId,
        Name: item.name,
        "Study Center" : item?.studycenterName ?? centerName,
        Course: item.courseName,
        ...(date && { "Exam Date": "" }),
        ...Object.fromEntries(fields.map((field) => [field, ""])),
      }));

      const fileName = result.studycenterName || "Doc Sheet";
      excelDownload(rows, fileName);
      // setFilters({ course: "", batch: "", year: "" });
      setError(null);
    } catch (err) {
      console.error(err);
      toast.error("Excel download failed");
    } finally {
      setLoadingType(null);
    }
  };

  const dialogRef = useRef(null);

  return (
    <>

      <div className="relative w-full">
        <Button className={"w-full"} onClick={() => setIsOpen(true)}>
          Download <Download04Icon className="ml-2" strokeWidth={2} />
        </Button>
        {isOpen && (
          <div
            className={`fixed w-full h-full flex items-center justify-center z-10 inset-0 bg-black/70 transition-all duration-300 p-4 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              ref={dialogRef}
              className="w-full space-y-2 max-w-sm p-6 bg-white rounded-lg shadow-md relative"
            >
              <div
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground "
              >
                <XIcon className="w-5 h-5 cursor-pointer" />
              </div>
              <div>
                <h1 className="text-lg font-medium">{name}</h1>
                <p className="text-sm text-muted-foreground">
                  Select course, batch, and year to download the {name}.
                </p>
              </div>
              <div>
                <div className="py-4">
                  <SelectDropDown
                    error={error}
                    filters={filters}
                    setFilters={setFilters}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button
                  variant="outline"
                  onClick={handleDownloadPDF}
                  disabled={loadingType === "pdf" && isPending}
                >
                  {loadingType === "pdf" && isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Download PDF"
                  )}
                </Button>

                <Button
                  onClick={handleDownloadExcel}
                  disabled={loadingType === "excel" && isPending}
                >
                  {loadingType === "excel" && isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Download Excel"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden PDF Component for Printing */}
      <div className="bg-white   invisible absolute print:visible inset-0   overflow-hidden">
        <div ref={contentRef}>
          <PDFDesign
            isLong={isLong}
            date={date}
            marks={mark}
            headers={fields}
            name={name}
            data={pdfData || {}}
          />
        </div>
      </div>
    </>
  );
}
