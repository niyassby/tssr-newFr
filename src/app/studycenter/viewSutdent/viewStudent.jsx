import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import {
  useCourseOfStudyCenter,
  useGetStudyCenterForExcel,
} from "@/hooks/tanstackHooks/useStudyCentre";
import { StudentTable } from "@/components/studycenterComponents/StudentView/StudentTable";
import StudentFilter from "@/components/studycenterComponents/StudentView/StudentFilter";
import { useStudentOfStudyCenter } from "@/hooks/tanstackHooks/useStudents";
import NoData from "@/components/ui/noData";
import { StudentDl } from "@/components/studycenterComponents/StudentView/StudentDl";
import Pagination from "@/components/ui/Pagination";
import { HiOutlineAdjustmentsHorizontal, HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useFilters } from "@/Context/FilterContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/Context/authContext";

export function ViewStudent() {
  // const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const { data: course } = useCourseOfStudyCenter();
  const { data: studycenter } = useGetStudyCenterForExcel();
  const [isFilter, setIsFilter]=useState(false)
  const navigate = useNavigate();
  const {filters, setFilters, search, setSearch} = useFilters()
  const {user}=useAuth()

   
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);  
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, error, isLoading } = useStudentOfStudyCenter(
    currentPage,
    perPage,
    debouncedSearch,
    filters.course,
    filters.batch,
    filters.year,
    filters.sort,
    filters.studyCentre
  );

  useEffect(() => {
    if (data && data.data) {
      setStudents(data.data);
    }
    if (data) {
      setTotalPage(data.totalPages);
    }
  }, [data]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
        Error to fetch data
      </div>
    );
  }

  return (
    <div className=" w-full h-full">
      <div className="md:space-y-6 space-y-5 w-full h-full">
        <div>
          <h1 className="text-2xl font-medium text-foreground">Students Data</h1>
          <p className="text-sm text-muted-foreground">Manage all students data in one place</p>
        </div>
          <div className="flex justify-between items-center max-sm:flex-col gap-2">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search Student"
            className="max-w-sm max-sm:max-w-full"
          />
          <div className="grid grid-cols-2 gap-2 max-sm:w-full">
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => setIsFilter(!isFilter)}
              variant="outline"
            >
              {isFilter ?<HiOutlineXMark size={26} />:
              <HiOutlineAdjustmentsHorizontal strokeWidth={1} size={30} />}
            </Button>
            <StudentDl />
          </div>
              <Button onClick={()=>navigate('verification')} className="max-sm:w-full ">Verifications</Button>
          </div>
          </div>

        <div className={`w-full flex border items-center px-3 rounded-xl max-md:flex-col justify-center md:justify-between gap-2 transition-all duration-300 overflow-hidden ${isFilter ? "md:h-16 h-52 visible opacity-100": "h-0 invisible opacity-0"}`}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-2 w-full max-w- 5xl ">
          <StudentFilter
            courses={course?.data}
            studycenter={studycenter?.data}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <Select onValueChange={(value)=>setPerPage(value)} >
          <SelectTrigger className={`w-full   border-accent shadow-none ${user?.role === "admin" && "max-md:col-span-2"} `}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className=' '>
            <SelectGroup>
              {[10, 20, 50, 100].map((item) =><SelectItem key={item} value={item}>{item}</SelectItem>)}
            </SelectGroup>
          </SelectContent>
        </Select>
          </div>
          <div className="grid   gap-2">
            <Button
              onClick={() => {
                setFilters({
                  course: "",
                  batch: "",
                  year: "",
                  sort: "",
                  studyCentre: "",
                });
                setIsFilter(false)
              }}
              variant="outline"
            >
              <HiOutlineXMark size={26} />
            </Button>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : students.length > 0 ? (
          <>
            <div className="rounded-2xl border overflow-hidden">
              <StudentTable data={students} />
              <Pagination
                totalData={data?.totalData}
                currentPage={currentPage}
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}

export default ViewStudent;
