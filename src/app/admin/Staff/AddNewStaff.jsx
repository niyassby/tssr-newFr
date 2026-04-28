import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datePicker";
import { states } from "@/lib/list";
import { Upload04Icon, ImageAdd02Icon } from "hugeicons-react";
import { useCreateStaff } from "@/hooks/tanstackHooks/useStaffs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFirebaseUpload } from "@/hooks/useFirebaseUpload";
import { Progress } from "@/components/ui/progress";

function AddNewStaff() {
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setLoading]=useState(false)
  const navigate = useNavigate();
  const {mutate, isPending}=useCreateStaff()
  const { uploadFile, progress, uploading, error: uploadError } = useFirebaseUpload();
  const [staff, setStaff] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dob: new Date(),
    age: "",
    address: {
      state: "",
      district: "",
      pincode: "",
      place: "",
    },
    department: "",
    qualification: "",
    designation: "",
    profileImage: "",
  });

  const validate = () => {
    let newErrors = ""

    if (!staff.name) newErrors = "Full Name is required.";
    if (!staff.age || isNaN(staff.age) || staff.age < 1)
      newErrors = "Valid age is required.";
    if (!staff.gender) newErrors = "Gender is required.";
    if (!staff.phoneNumber)
      newErrors = "Valid 10-digit phone number is required.";
    if (!staff.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors = "Valid email is required.";
    if (!staff.address.place) newErrors = "Place is required.";
    if (!staff.address.state) newErrors = "State is required.";
    if (!staff.address.district) newErrors = "District is required.";
    if (!staff.address.pincode.match(/^\d{6}$/))
      newErrors = "Valid 6-digit pincode is required.";
    if (!staff.designation) newErrors = "Designation is required.";
    if (!staff.qualification)
      newErrors = "Qualification is required.";
    if (!staff.department) newErrors = "Department is required.";
    // if (!staff.profileImage)
    //   newErrors = "Profile image is required.";

    setError(newErrors);
    return newErrors === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (key, value) => {
    setStaff((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [key]: value,
      },
    }));
  };

  const handleDateChange = (date) => {
    setStaff((prev) => ({ ...prev, dob: date }));
  };

  const handleFileUpload = (e) => {
    const { files } = e.target;

    if (files && files[0]) {
      if (files[0].size > 1048576) {
        setError("File size should be less than 1MB.");
        return;
      }
      setFile(files[0]);
      setError(null);
    }
  };

  
  const handleCancle = () => {
    setStaff({
      name: "",
      phoneNumber: "",
      email: "",
      gender: "",
      dob: new Date(),
      age: "",
      address: {
        state: "",
        district: "",
        pincode: "",
        place: "",
      },
      department: "",
      qualification: "",
      designation: "",
      profileImage: "zsdfsdafdf",
    });
    setFile(null);
    setError(null);
    navigate(-1)
  }

  const handleSubmit = async () => {
    if (!validate()) {
      return 
    }
    setLoading(true)

    if (file) {
      var { url, fullPath } = await uploadFile({
        file,
        path: `staff`,
      });

      if(!url){
        setLoading(false)
        toast.error("Failed to upload profile image.")
        return
      }
    }



    mutate({data: [{...staff, profileImage: url}]}, {
      onSuccess: (data) => {
        if(data.success){
          toast.success("Staff added successfully.")
          handleCancle()
        }else{
          toast.error(data.message)
        }
        setLoading(false)
      },
      onError: (err) => {
        setLoading(false)
        toast.error("Failed to add staff.")
      }
    })
    setLoading(false)
  }


  useEffect(()=>{
    const age = new Date().getFullYear() - new Date(staff.dob).getFullYear();
    setStaff((prev) => ({ ...prev, age }));
  }, [staff.dob])

  const districtOptions =
    states.find((s) => s.state === staff.address.state)?.districts || [];

  return (
    <div className="max-w-4xl mx-auto h-full">
      <Card>
        <CardHeader>
          <CardTitle>Add New Staff</CardTitle>
          <CardDescription>Fill in all the required staff details.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Profile Image Upload */}
          <div className="flex items-end gap-4">
            <label htmlFor="profileImage" className="cursor-pointer">
              <div className="size-28 border rounded-full overflow-hidden">
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 hover:bg-gray-200">
                    <ImageAdd02Icon className="text-muted-foreground" strokeWidth={1} size={30} />
                  </div>
                )}
              </div>
            </label>

            <div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="sr-only"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="profileImage"
                className="border px-3 py-2 rounded-md inline-flex items-center gap-2 cursor-pointer text-sm font-medium"
              >
                <Upload04Icon size={18} />
                Upload Image
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Max 1MB, formats: JPG, PNG
              </p>
              {error === "File size should be less than 1MB." && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>

          <div className="pb-2 border-b">
            <h1 className="text-xl font-medium ">Personel info</h1>
          </div>

          {/* Text Inputs */}
          <FormInput error={error && staff.name === ''} name="name" label="Full Name" value={staff.name} onChange={handleChange} />
          {/* <FormInput error={error && staff.age === ''} name="age" label="Age" type="number" value={staff.age} onChange={handleChange} /> */}
          <FormInput error={error && staff.phoneNumber === ''} name="phoneNumber" label="Phone Number" value={staff.phoneNumber} onChange={handleChange} />
          <FormInput error={error && staff.email === ''} name="email" label="Email" value={staff.email} onChange={handleChange} />
        

          {/* Date of Birth */}
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6  ">
            <Label className="sm:col-span-3">Date of Birth</Label>
            <div className="sm:col-span-9 grid sm:grid-cols-2 gap-2">
              <DatePicker
                date={staff.dob}
                setDate={handleDateChange}
                year={new Date().getFullYear() - 50}
                length={52}
              />
               <Input
                placeholder="Age"
                value={staff.age}
                type='number'
                onChange={(e) => setStaff({...staff, age: e.target.value})}
              />
            </div>
          </div>

          {/* Gender */}
          <SelectInput
            label="Gender"
            error={error && staff.gender === ''}
            value={staff.gender}
            onChange={(val) => setStaff((prev) => ({ ...prev, gender: val }))}
            placeholder="Select Gender"
            items={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />

          {/* State & District */}
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6 items-start">
            <Label className="sm:col-span-3">Address</Label>
            <div className="sm:col-span-9 grid md:grid-cols-2 gap-2 ">
              <Select
                onValueChange={(value) => handleAddressChange("state", value)}
                value={staff.address.state}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s.state} value={s.state}>
                      {s.state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => handleAddressChange("district", value)}
                value={staff.address.district}
                disabled={!staff.address.state}
              >
                <SelectTrigger  className='w-full'>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {districtOptions.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Pincode"
                value={staff.address.pincode}
                onChange={(e) => handleAddressChange("pincode", e.target.value)}
              />
              <Input
                placeholder="Place"
                value={staff.address.place}
                onChange={(e) => handleAddressChange("place", e.target.value)}
              />
            </div>
          </div>
          <div className="pb-2 border-b">
            <h1 className="text-xl font-medium ">Academic info</h1>
          </div>
          <FormInput error={error && staff.qualification === ''} name="qualification" label="Qualification" value={staff.qualification} onChange={handleChange} />
          <FormInput error={error && staff.designation === ''} name="designation" label="Designation" value={staff.designation} onChange={handleChange} />
          <FormInput error={error && staff.department === ''} name="department" label="Department" value={staff.department} onChange={handleChange} />

          {/* Submit Button */}
          <div className="">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {uploading && 
            <>
            <p className="text-xs mb-1 text-muted-foreground">Image Uploading</p>
            <Progress value={progress} className="w-full " />
            </>}
          </div>
        </CardContent> 
        <CardFooter className='justify-end gap-2'>
          <Button onClick={handleCancle} variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>{isLoading || isPending ? <Loader2 className="animate-spin"/> :"Submit Details"}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AddNewStaff;


// Reusable Input
function FormInput({ name, label, type = "text", value, onChange, error }) {
  return (
    <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
      <Label className="sm:col-span-3" htmlFor={name}>
        {label}
      </Label>
      <div className="sm:col-span-9">
        <Input
          id={name}
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          className={`${error ? "border-red-500" : ""}`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
}

// Reusable Select
function SelectInput({ label, value, onChange, placeholder, items }) {
  return (
    <div className="grid sm:grid-cols-12 gap-2 sm:gap-6 ">
      <Label className="sm:col-span-3">{label}</Label>
      <div className="sm:col-span-9">
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
