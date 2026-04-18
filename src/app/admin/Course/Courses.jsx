import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Loader from "@/components/ui/loader";
import { TableComp } from "@/components/admincomp/studycenComp/Table";
import { useStudyCentre } from "@/hooks/tanstackHooks/useStudyCentre";
import { useNavigate } from "react-router-dom";
import AllCourse from "@/components/admincomp/courseComp/AllCourse";
import Batches from "./Batches";
import { AddCourse } from "@/components/admincomp/courseComp/AddCourse";
import { useAllSubjects } from "@/hooks/tanstackHooks/useSubjects";
import { useAllCourse, useCreateCourse } from "@/hooks/tanstackHooks/useCourse";
import { toast } from "sonner";
import { useAuth } from "@/Context/authContext";

export function Courses() {
  const [search, setSearch] = useState("");
  const [selectedCoures, setSelectedCourse] = useState([]);
  const [selected, setSelected] = useState(null);
  const { data: subjects } = useAllSubjects();
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const { mutate } = useCreateCourse();
  const {user}=useAuth()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
    subjects: [],
  });

  const { data, error, isLoading } = useAllCourse();
  useEffect(() => {
    if (data) {
      setCourse(data.data);
    }

  }, [data]);


  const handleAddCourse = () => {
    mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          toast("Course created", {
            description: "Course created successfully",
          });
        } else {
          toast("Somthing went wrong", {
            description: data.message,
          });
        }
      },
    });
  };



  const filterData = course.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  })

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
        Error to fetch data
      </div>
    );
  }

  return (
    <div className=" w-full h-full mt-5">
      {selected ? (
        <div>
          <Batches data={selected} subjects={subjects} setData={setSelected} />
        </div>
      ) : (
        <div className="space-y-6 w-full h-full">
          <div className="flex max-sm:flex-col gap-2 justify-between items-center">
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              placeholder="Search users..."
              className="max-w-sm max-sm:max-w-full"
            />
            <div>
              {user.isAdmin && <div className=" grid grid-cols-2 gap-2 ">
                <Button
                  className={"w-full border"}
                  variant='secondary'
                  onClick={() => navigate("/admin/academics/subjects")}
                >
                  Subjects
                </Button>

                <AddCourse
                  formData={formData}
                  setFormData={setFormData}
                  subject={subjects?.data}
                  submit={handleAddCourse}
                  type="add"
                  selected={selectedCoures}
                  setSelected={setSelectedCourse}
                />
                {/* <Button className={'max-sm:w-full'} onClick={()=>navigate('/admin/studycentre/add')}>Add Course</Button> */}
              </div>}
            </div>
          </div>

          {isLoading ? (
            <div className="w-full h-full">
              <Loader />
            </div>
          ) : course.length > 0 ? (
            <div className="">
              <AllCourse setSelected={setSelected} data={filterData} />
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center font-medium text-muted-foreground">
              No data found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Courses;
