import {useState } from "react";
import { useCourseOfStudyCenter, useGetStudyCenterForExcel } from "@/hooks/tanstackHooks/useStudyCentre";
import { useAuth } from "@/Context/authContext";
import SearchSelect from "@/components/ui/SearchSelect";

function SelectDropDown({ filters, setFilters, error }) {
  const { data: course } = useCourseOfStudyCenter();
  const [batchs, setBatches] = useState([]);
  const { data: center } = useGetStudyCenterForExcel()
  const { user } = useAuth()

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const currentYear = new Date().getFullYear();
  const oldYears = Array.from({ length: 16 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-3 ">
      {/* Sort Option */}
      {user.isAdmin && <SearchSelect
        data={center?.data || []}
        text={"Select Center"}
        value={filters?.studycenterId}
        onChange={(value) => handleFilterChange("studycenterId", value)}
        error={false}
        isObject={true} 
      />}
      <div className="w-full space-y-3 ">
        <SearchSelect
          data={course ? course.data : []}
          text="Select Course"
          value={filters.course}
          onChange={(value) => {
            if (!value) {
              setBatches([]);
              handleFilterChange("course", "");
              return;
            }
            const batch = course.data.find(
              (item) => item.courseId === value
            )?.batches;
            setBatches(batch);
            handleFilterChange("course", value);
          }}
          isObject={true}
          error={error && filters.course === ""}
        />
        <SearchSelect
          disabled={batchs.length === 0}
          data={batchs}
          isObject
          text={"Select Batch"}
          value={filters.batch}
          onChange={(value) => handleFilterChange("batch", value)}
          error={error && filters.batch === ""}
        />

        <SearchSelect
          data={oldYears}
          text={"Select Year"}
          value={filters.year}
          onChange={(value) => handleFilterChange("year", value)}
          error={error && filters.year === ""}
        />
      </div>
    </div>
  );
}
export default SelectDropDown;

// function DlFilter({

//   data,

//   lebal,

//   text,

//   value,

//   onChange,

//   isObject = false,

//   disabled = false,

//   error = false,

// }) {



//   const [search, setSearch] = useState("");

//   const inputRef = useRef(null)

//   // filter items based on search text

//   const filteredData = data.filter((item) => {

//     const label = isObject

//       ? String(item.courseName || item.month || item.name || "").toLowerCase()

//       : String(item || "").toLowerCase();

 

//     return label.includes(search.toLowerCase());

//   });



//   const handleInputKeyDown = (e) => {

//     // Prevent the Select component from handling these events

//     e.stopPropagation()

//     e.nativeEvent.stopImmediatePropagation()



//     // Allow normal input behavior for all keys except Escape

//     if (e.key === "Escape") {

//       inputRef.current?.blur()

//     }

//   }



//   const handleInputChange = (e) => {

//     setSearch(e.target.value)

//     // Ensure input stays focused

//     setTimeout(() => {

//       if (inputRef.current) {

//         inputRef.current.focus()

//       }

//     }, 0)

//   }





//   return (

//     <div className="space-y-1 w-full ">

//       <Select value={value} onValueChange={onChange} disabled={disabled}>

//         <SelectTrigger

//           className={`w-full max-w-[350px] shadow-none  ${error ? "border-red-500" : ""}`}

//         >

//           <SelectValue placeholder={text} />

//         </SelectTrigger>

//         <SelectContent className='max-w-md'>

//           {/* Search Input */}

//           <div className="p-2">

//             <Input

//               placeholder="Search..."

//               value={search}

//               ref={inputRef}

//               onChange={handleInputChange}

//               className="h-8"

//               onKeyDown={handleInputKeyDown}  // block radix typeahead

//               onKeyUp={handleInputKeyDown}

//               onKeyDownCapture={handleInputKeyDown}

//             />

//           </div>

//           <SelectGroup>

//             <SelectLabel>{lebal}</SelectLabel>

//             {isObject ? (

//               filteredData.map((item, index) => (

//                 <SelectItem key={index} value={item.courseId || item._id}>

//                   {item.courseName || item.month || item.name }

//                 </SelectItem>

//               ))

//             ) : (

//               <>

//                 {filteredData.map((item, index) => (

//                   <SelectItem key={index} value={item}>

//                     {item}

//                   </SelectItem>

//                 ))}

//               </>

//             )}

//           </SelectGroup>

//         </SelectContent>

//       </Select>

//     </div>

//   );

// }