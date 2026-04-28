import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/datePicker";
import { MultiSelect } from "@/components/ui/multiselect";
import { useCreateSutdyCenter } from "@/hooks/tanstackHooks/useStudyCentre";
import { states } from "@/lib/list";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAllCourse } from "@/hooks/tanstackHooks/useCourse";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Upload04Icon } from "hugeicons-react";
import { useFirebaseUpload } from "@/hooks/useFirebaseUpload";
import { Progress } from "@/components/ui/progress";

function CreateStudy() {
  const {mutate}=useCreateSutdyCenter()
  const navigate= useNavigate()
  const [file, setFile]=useState(null)
  const [isError, setError]=useState(false)
  const { uploadFile, progress, uploading, error: uploadError } = useFirebaseUpload();
  const [formData, setFormData] = useState({
    name: "",
    centerHead: "",
    email: "",
    phoneNumber: "",
    renewalDate: new Date(),
    state: "",
    district: "",
    place: "",
    pincode: "",
    courses: [],
    authEmail: "",
    password: '',
  });

  const handleCancel = () => {
    setFormData({
      name: "",
      centerHead: "",
      email: "",
      phoneNumber: "",
      renewalDate: new Date(),
      state: "",
      district: "",
      place: "",
      pincode: "",
      courses: [],
      authEmail: "",
      password: ''
    });
    navigate('/admin/studycentre')
  }

  const handleFileUpload = (e) => {
    const { files } = e.target;

    if (files && files[0]) {
      if (files[0].size > 1048576) {
        toast.error("File size should be less than 1MB")
        e.target.value = "";
        return;
      }

      setFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    if(!formData.name || !formData.centerHead || !formData.email || !formData.phoneNumber || !formData.state || !formData.district || !formData.place || !formData.pincode || !formData.courses.length === 0 || !formData.authEmail || !formData.password){
      setError(true)
      return
    }

    if(file){
      var { url } = await uploadFile({
        file: file,
        path: "logo",
      });

      if(!url){
        toast.error("Failed to upload profile image.")
        return
      }
    }
    mutate({...formData, logo: url? url : ""}, {
      onSuccess: (data) => { 
        if(data.success){
          toast("Study centre created", {
            description: 'Study centre created successfully',});
          handleCancel()
          
        }else{
          toast("Somthing went wrong", {
            description: data.message,});
            setError(data.message)
        }
      }
    })
    
  }
  return (
    <div className="w-full h-full max-w-[60rem] mx-auto border p-4 md:py-6 md:px-8 rounded-lg ">
      <div className="">
        <div className="">
          <h1 className="text-xl font-semibold">Submit Details</h1>
          <p className="text-sm text-muted-foreground ">
            Submit details of study centre
          </p>
        </div>
        <div className="flex items-end gap-2 py-3 mt-5">
        <div className="size-32 border rounded-full overflow-hidden bg-accent">
                {file && <img
                  src={file? URL.createObjectURL(file) : "/images/default.jpg"}
                  className="w-full h-full object-cover"
                  alt=""
                />}
              </div>
        <div className="flex flex-col items-start">
                <input
                  onChange={handleFileUpload}
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                />
                <label
                  htmlFor="profileImage"
                  className={`border py-2 px-3 inline-flex gap-1 items-center rounded-md cursor-pointer text-sm font-medium  `}
                >
                  <Upload04Icon size={20} /> Upload Logo
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum file size is 1MB. Accepted: JPG, JPEG
                </p>
                {/* {errors.profileImage && (
                  <p className="text-sm text-red-600 ">{errors.profileImage}</p>
                )} */}
              </div>
        </div>
        <FrDtils formData={formData} setFormData={setFormData} isError={isError} />
        {isError && <p className="text-sm text-red-500">Please fill all the fields</p>}
        {uploading && <Progress value={progress} className={'w-full bg-accent'}/>}
        <div className="flex items-center justify-end mt-6 gap-2">
        <Button onClick={handleCancel} variant='outline'>Cancel</Button>
        <Button onClick={handleSubmit}>Create Centre</Button>

        </div>
      </div>
    </div>
  );
}

export default CreateStudy;

function FrDtils({ setFormData, formData, isError}) {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState([]);
  const [allCourse, setAllCourse] = useState([])
  const {data}=useAllCourse()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    setFormData({...formData,courses:selected, renewalDate:date})
  }, [selected, date])

  useEffect(()=>{
    if(data && data.data){
      setAllCourse(data.data)
    }
  }, [data])

  return (
    <div className=" space-y-3 mt-6">
      <FormInputs
        name="Center Name"
        id="name"
        onChange={handleChange}
        value={formData.name}
        error={isError && formData.name === ""}
      />
      <FormInputs
        name="Center Head"
        id="centerHead"
        onChange={handleChange}
        value={formData.centerHead}
        error={isError && formData.centerHead === ""}
      />
      <FormInputs
        name="Email"
        id="email"
        onChange={handleChange}
        value={formData.email}
        error={isError && formData.email === ""}
      />
      <FormInputs
        name="Phone Number"
        id="phoneNumber"
        onChange={handleChange}
        value={formData.phoneNumber}
        error={isError && formData.phoneNumber === ""}
      />
      <DateInputs
        name="Renewal Date"
        id="renewalDate"
        date={date}
        setDate={setDate}
      />
      <div className="grid sm:grid-cols-12 gap-3 sm:gap-5">
        <div className="sm:col-span-3">
          <Label htmlFor="Address" className="col-span-3">
            Selected Course
          </Label>
        </div>
        <div className="sm:col-span-9">
          <MultiSelect
            options={allCourse}
            selected={selected}
            onChange={setSelected}
            placeholder="Select items"
            error={isError && selected.length === 0}
          />
        </div>
      </div>

      <div className="mt-6 mb-4 border-t">
        <h1 className="text-lg font-medium mt-4">Address</h1>
        <p className="text-sm text-muted-foreground">
          Submit address of the study centre
        </p>
      </div>

      <StateSelect
        name="Address"
        setFormData={setFormData}
        formData={formData}
        error={isError}
      />

      <FormInputs
        name="Place"
        id="place"
        onChange={handleChange}
        value={formData.place}
        error={isError && formData.place === ""}
      />
      <FormInputs
        name="Pincode"
        id="pincode"
        onChange={handleChange}
        value={formData.pincode}
        error={isError && formData.pincode === ""}
      />

      <div className="mt-6 mb-4 border-t">
        <h1 className="text-lg font-medium mt-4">Authentication</h1>
        <p className="text-sm text-muted-foreground">
          Submit email and password to create centre account
        </p>
      </div>

      <FormInputs
        name="Auth Email"
        id="authEmail"
        onChange={handleChange}
        value={formData.authEmail}
        error={isError && formData.authEmail === ""}
      />
      <FormInputs
        name="Password"
        id="password"
        onChange={handleChange}
        value={formData.password}
        type="password"
        error={isError && formData.password === ""}
      />
      <div className="mt-6 mb-4 border-t">
        <h1 className="text-lg font-medium mt-4">Submit Application</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Submit address of the study centre Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam enim tenetur fugit minima veniam dolore itaque est, eveniet quas quidem praesentium nihil odio reiciendis expedita commodi consectetur possimus voluptas libero.
        </p>
      </div>
    </div>
  );
}

export function FormInputs({ name, onChange, id, type, value, error }) {
  return (
    <div className="grid sm:grid-cols-12 gap-3 sm:gap-5">
      <div className="sm:col-span-3">
        <Label htmlFor={id}>{name}</Label>
      </div>
      <div className="sm:col-span-9">
        <Input
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={name}
          className={`shadow-none py-5 ${error && "border-red-500"}`}
          type={type ? type : "text"}
        />
      </div>
    </div>
  );
}

export function DateInputs({ name, id, date, setDate }) {
  return (
    <div className="grid sm:grid-cols-12 gap-3 sm:gap-5">
      <div className="sm:col-span-3">
        <Label htmlFor={id}>{name}</Label>
      </div>
      <div className="sm:col-span-9">
        <DatePicker  date={date} setDate={setDate} />
      </div>
    </div>
  );
}

export const StateSelect = ({ name, setFormData, formData, error}) => {
  // const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);

  const handleStateChange = (stateName) => {
    setFormData({...formData, state:stateName});
    const foundState = states.find((item) => item.state === stateName);
    setDistricts(foundState ? foundState.districts : []);
  };

  return (
    <div className="grid sm:grid-cols-12 gap-3 sm:gap-5">
      <div className="sm:col-span-3 ">
        <Label htmlFor={name}>{name}</Label>
      </div>
      <div className="sm:col-span-9 w-full grid sm:grid-cols-2 gap-2 ">
        {/* State Dropdown */}
        <Select value={formData.state} onValueChange={handleStateChange}>
          <SelectTrigger className={`w-full py-5 shadow-none ${error && formData.state === "" && "border-red-500"}`}>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((item, i) => (
              <SelectItem key={i} value={item.state}>
                {item.state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* District Dropdown */}
        <Select value={formData.district} onValueChange={(value)=>setFormData({...formData, district:value})} disabled={districts.length === 0}>
          <SelectTrigger className={`w-full py-5 shadow-none ${error && formData.district === "" && "border-red-500"}`}>
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district, i) => (
              <SelectItem key={i} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};