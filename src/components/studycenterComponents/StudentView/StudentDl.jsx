import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { excelDownload } from "@/lib/ExcelDownload";
import { useCourseOfStudyCenter, useGetStudyCenterForExcel } from "@/hooks/tanstackHooks/useStudyCentre";
import { Download04Icon } from "hugeicons-react";
import { Download, Loader2, MoreVerticalIcon } from "lucide-react";
import { useStudentForDl } from "@/hooks/tanstackHooks/useStudents";
import { toast } from "sonner";
import { useAuth } from "@/Context/authContext";
import { HiMiniArrowDownTray } from "react-icons/hi2";
import { Input } from "@/components/ui/input";

const EXPORT_FIELDS = [
  { id: "registrationNumber", label: "Reg. Number" },
  { id: "studentId", label: "Student ID" },
  { id: "name", label: "Name" },
  { id: "age", label: "Age" },
  { id: "dateOfBirth", label: "Date of Birth" },
  { id: "gender", label: "Gender" },
  { id: "phoneNumber", label: "Phone Number" },
  { id: "place", label: "Place" },
  { id: "district", label: "District" },
  { id: "state", label: "State" },
  { id: "pincode", label: "Pincode" },
  { id: "email", label: "Email" },
  { id: "adhaarNumber", label: "Aadhaar Number" },
  { id: "dateOfAdmission", label: "Date of Admission" },
  { id: "parentName", label: "Parent Name" },
  { id: "qualification", label: "Qualification" },
  { id: "houseName", label: "House Name" },
];

export function StudentDl() {
  const [includedFields, setIncludedFields] = useState([
    "name",
    "age",
    "dateOfBirth",
    "gender",
    "phoneNumber",
    "place",
    "district",
    "state",
    "pincode",
    "email",
    "adhaarNumber",
    "registrationNumber",
    "studentId",
    "dateOfAdmission",
    "parentName",
    "qualification",
    "houseName"
  ]);
  const { data: course } = useCourseOfStudyCenter();
  const [batchs, setBatches] = useState([]);
  const [error, setError] = useState(null);
  const {user}=useAuth()
  const [isLoading, setLoading] = useState(false);
  const { isPending, mutateAsync } = useStudentForDl();
  const {data:studycenter}=useGetStudyCenterForExcel()
  const [isOpen, setOpen]=useState(false)
  const [filters, setFilters] = useState({
    course: "",
    batch: "",
    year: "",
    studyCenter: "",
    studycenterId: ""
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const toggleField = (fieldId) =>
    setIncludedFields((prev) =>
      prev.includes(fieldId)
        ? prev.filter((id) => id !== fieldId)
        : [...prev, fieldId]
    );

  const currentYear = new Date().getFullYear()+1;
  const oldYears = Array.from({ length: 18 }, (_, i) => currentYear - i);

  const handleDownload = async () => {
    setError(null);
    if(!user.isAdmin){
      if ( !filters.course || !filters.batch || !filters.year) {
        toast.error("Please select all fields");
        setError("Please select all fields");
        return;
      }
    }
    try {
      setLoading(true);
      const data = await mutateAsync({
        courseId: filters.course,
        batchId: filters.batch,
        year: filters.year,
        studyCenter: filters.studyCenter,
        fields: includedFields,
      }, {
        onSuccess: (data) => {
          if(!data.success){
            toast.error(data.message)
            setError(data.message)
          }
        }
      });

      if (data && data.data) {
        excelDownload(data?.data);
        setFilters({
          course: "",
          batch: "",
          year: "",
        });
      }
    } catch (err) {
      toast.error("Failed to download study center data.");
    } finally {
      
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(!isOpen){
      setFilters({
        course: "",
        batch: "",
        year: "",
        studyCenter: ""
      })
      setError(null)
    }
  }, [isOpen])
  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button  >
          {/* Download */}
          <HiMiniArrowDownTray size={26}/>
        </Button>
      </PopoverTrigger>

      <PopoverContent
      onInteractOutside={(e) => {
        e.preventDefault()
      }}
       className="w-72 shadow-2xl relative" align="end">
        <div className="grid gap-4">
          <div className="">
            <h4 className="font-medium">Export Student Data</h4>
            <p className="text-sm text-muted-foreground">
              Select fields to include in export
            </p>
          </div>

          <div className="space-y-3">
            {/* Sort Option */}
            <div className="w-full space-y-2 ">
              {user.isAdmin&&<DlFilter
                data={studycenter ? studycenter.data : []}
                lebal="Study Center"
                text="Select Center"
                value={filters.studyCenter}
                onChange={(value) => {
                  handleFilterChange("studyCenter", value);
                }}
                isObject={true}
                // error={error && filters.studyCenter === ""}
              />}
              <DlFilter
                data={course ? course.data : []}
                lebal="Course"
                text="Select Course"
                value={filters.course}
                onChange={(value) => {
                  const batch = course.data.find(
                    (item) => item.courseId === value
                  )?.batches;
                  setBatches(batch);
                  handleFilterChange("course", value);
                }}
                isObject={true}
                error={error && filters.course === ""}
              />
              <DlFilter
                disabled={batchs.length === 0}
                data={batchs}
                isObject
                text={"Select Batch"}
                value={filters.batch}
                onChange={(value) => handleFilterChange("batch", value)}
                lebal={"Batch"}
                error={error && filters.batch === ""}
              />
              <DlFilter
                data={oldYears}
                text={"Select Year"}
                value={filters.year}
                onChange={(value) => handleFilterChange("year", value)}
                lebal={"Year"}
                error={error && filters.year === ""}
              />
            </div>

            {/* Field Selector */}
            <div>
              <p className="text-sm font-medium mb-2">Include Fields:</p>
              <div className="flex flex-wrap gap-2">
                {EXPORT_FIELDS.map(({ id, label }) => (
                  <div key={id} className="flex items-center space-x-1">
                    <Checkbox
                      id={`field-${id}`}
                      checked={includedFields.includes(id)}
                      onCheckedChange={() => toggleField(id)}
                    />
                    <label htmlFor={`field-${id}`} className="text-sm">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div >
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="grid grid-cols-2 gap-2 mt-2">

            <Button variant='outline' onClick={()=>setOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDownload}
              disabled={isPending}
              className="w-full "
            >
              {isPending || isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex items-center">
                  Export 
                  <Download  className="ml-2" />
                </span>
              )}
            </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DlFilter({
  data,
  lebal,
  text,
  value,
  onChange,
  isObject = false,
  disabled = false,
  error = false,
}) {

  const [search, setSearch] = useState("");

  // filter items based on search text
  const filteredData = data.filter((item) => {
    const label = isObject
      ? String(item.courseName || item.month || item.name || "").toLowerCase()
      : String(item || "").toLowerCase();
  
    return label.includes(search.toLowerCase());
  })

  return (
    <div className="space-y-1 w-full">
      {/* <h1 className=" text-sm font-medium">{lebal}</h1> */}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          className={`w-full max-w-64 shadow-none ${error ? "border-red-500" : ""}`}
        >
          <SelectValue placeholder={text} />
        </SelectTrigger>
        <SelectContent className='w-full max-w-[300px]'>
        <div className="p-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8"
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
          <SelectGroup>
            <SelectLabel>{lebal}</SelectLabel>
            {isObject ? (
              filteredData.map((item, index) => (
                <SelectItem key={index} value={item.courseId || item._id}>
                  {item.courseName || item.month || item.name}
                </SelectItem>
              ))
            ) : (
              <>
                {filteredData.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
