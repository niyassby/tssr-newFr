import { useEffect, useState } from "react";
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
import { CloudUploadIcon, ImageAdd02Icon, Upload04Icon } from "hugeicons-react";

export function EnrollmentFormUI({ userData, onBack, onNext, setUserData }) {
  const [selectedState, setSelectedState] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dateOfBirth: new Date(),
    gender: "",
    phoneNumber: "",
    state: "",
    district: "",
    place: "",
    pincode: "",
    email: "",
    dateOfAdmission: new Date(),
    parentName: "",
    qualification: "",
    sslc: null,
    profileImage: null,
    adhaarNumber: userData?.adhaarNumber || "",
    houseName: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    
    // Check if a file is selected
    if (files && files[0]) {
      // 1MB = 1,048,576 bytes
      if (files[0].size > 1048576) {
        setErrors({
          ...errors,
          [name]: "File size should be less than 1MB.",
        })
        e.target.value = ''; // Clear the input
        return;
      }
      
      setFormData((prev) => ({
        ...prev,
        [name]: files[0]  
      }));
    }
  };

  useEffect(()=>{
    setFormData((prev) => ({
      ...prev,
      ...userData
    }));
  }, [userData])

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
    setFormData((prev) => ({
      ...prev,
      state: value,
      district: "", // reset district when state changes
    }));
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      age: value.replace(/[^0-9]/g, ""), 
    }));
  };

  const handleDistrictChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      district: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Full Name is required.";
    if (!formData.age || isNaN(formData.age) || formData.age < 1)
      newErrors.age = "Valid age is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Valid 10-digit phone number is required.";
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Valid email is required.";
    if (!formData.place) newErrors.place = "Place is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.district) newErrors.district = "District is required.";
    if (!formData.pincode.match(/^\d{6}$/))
      newErrors.pincode = "Valid 6-digit pincode is required.";
    if (!formData.parentName) newErrors.parentName = "Parent Name is required.";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required.";
    if (!formData.sslc) newErrors.sslc = "SSLC certificate is required.";
    if (!formData.profileImage)
      newErrors.profileImage = "Profile image is required.";
    if (!formData.houseName)
      newErrors.houseName = "House Name is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = ( ) => {
      
    if (!validate()) return;

    setUserData(formData);
    onNext();
  };

  const handleBackToVerification = () => {
    // Clear all form data
    setFormData({
      name: "",
      age: "",
      dateOfBirth: new Date(),
      gender: "",
      phoneNumber: "",
      state: "",
      district: "",
      place: "",
      pincode: "",
      email: "",
      dateOfAdmission: new Date(),
      parentName: "",
      qualification: "",
      sslc: null,
      profileImage: null,
      adhaarNumber: userData?.adhaarNumber || "",
      houseName: ""
    });

    // Clear errors
    setErrors({});

    // Navigate to studycenter
    onBack();
  };

  const districtOptions =
    states.find((s) => s.state === selectedState)?.districts || [];

    const image = formData.profileImage ? URL.createObjectURL(formData.profileImage) : 'https://img.freepik.com/premium-vector/profile-picture-placeholder-avatar-silhouette-gray-tones-icon-colored-shapes-gradient_1076610-40164.jpg';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 lg:p-8 shadow-lg bg-background rounded-2xl border">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Student Enrollment Form
        </h1>
        <p className="text-muted-foreground mt-1">Please fill all required fields</p>
      </div>

      <div className="space-y-8 ">
        {/* PERSONAL SECTION */}
        <div className="">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            <div className="col-span-full flex items-end gap-2 mb-5">
              <label
                htmlFor="profileImage"
                className="rounded-full overflow-hidden"
              >
                <div className="size-32 border rounded-full overflow-hidden">
                  {formData.profileImage ? (
                    <img
                      src={image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  ) : (
                    <div className="w-full h-full flex items-center transition-all justify-center bg-muted ">
                      <ImageAdd02Icon size={20} />
                    </div>
                  )}
                </div>
              </label>
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
                  className={`border py-2 px-3 inline-flex gap-1 items-center rounded-md cursor-pointer text-sm font-medium ${
                    errors.profileImage && formData.profileImage == null
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <Upload04Icon size={20} /> Upload Image{" "}
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  Maximum file size is 1MB. Accepted file types: JPG, JPEG
                </p>
                {errors.profileImage && (
                  <p className="text-sm text-red-600 ">{errors.profileImage}</p>
                )}
              </div>
            </div>
            <FormInput
              label="Full Name"
              id="name"
              name="name"
              autoCapitalize="characters"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FormInput
              label="Age"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleAgeChange}
              error={errors.age}
              type="text"
            />

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <DatePicker
                date={formData.dateOfBirth}
                setDate={(date) => handleDateChange(date, "dateOfBirth")}
                year={new Date().getFullYear() - 100}
                length={102}
              />
            </div>

            <div className="space-y-2 w-full">
              <Label>Gender</Label>
              <Select
                onValueChange={(val) =>
                  setFormData({ ...formData, gender: val })
                }
                value={formData.gender}
              >
                <SelectTrigger
                  className={`w-full ${
                    errors.gender && formData.gender == ""
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FormInput
              label="Phone Number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
            />

            <FormInput
              label="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
          
        </div>

        {/* ADDRESS SECTION */}
        <div className="">
          <h2 className="text-lg font-semibold  mb-4">
            Address Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
              label="Parent Name"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              error={errors.parentName}
            />
            <FormInput
              label="House Name"
              id="houseName"
              name="houseName"
              value={formData.houseName}
              onChange={handleChange}
              error={errors.houseName}
            />
            <div className="space-y-2">
              <Label>State</Label>
              <Select onValueChange={handleStateChange} value={selectedState}>
                <SelectTrigger
                  className={`w-full ${
                    errors.state && formData.state == "" ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s.state} value={s.state}>
                      {s.state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>District</Label>
              <Select
                onValueChange={handleDistrictChange}
                value={formData.district}
                disabled={!selectedState}
              >
                <SelectTrigger
                  className={`w-full ${
                    errors.district && formData.district == ""
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districtOptions.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <FormInput
              label="Place"
              id="place"
              name="place"
              value={formData.place}
              onChange={handleChange}
              error={errors.place}
            />
            <FormInput
              label="Pincode"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              error={errors.pincode}
            />
            
          </div>
        </div>

        {/* EDUCATION SECTION */}
        <div className="">
          <h2 className="text-lg font-semibold  mb-4">
            Education Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      

            <FormInput
              label="Higher Education Qualification"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              error={errors.qualification}
            />

            <div className=" col-span-full mt-5">
              <label
                htmlFor="sslc"
                className={`${
                  errors.sslc && formData.sslc == null ? "border-red-500" : ""
                } w-full py-7 border flex flex-col gapy-2 cursor-pointer hover:border-primary transition-all duration-200 hover:bg-muted items-center justify-center border-dashed border-gray-300 p-4 rounded-xl`}
              >
                {formData.sslc ? (
                  <h1 className="text-sm font-medium">{formData.sslc.name}</h1>
                ) : (
                  <>
                    <CloudUploadIcon strokeWidth={1} />
                    <h1 className="text-sm font-medium text-gray-600">
                      Upload SSLC Certificate
                    </h1>
                    <p className="text-xs text-gray-500">
                      Maximum file size is 1MB. Accepted file types: JPG, PDF
                    </p>
                    {errors.sslc && (
                      <p className="text-xs text-red-500">{errors.sslc}</p>
                    )}
                  </>
                )}
              </label>
              <input
                onChange={handleFileUpload}
                type="file"
                id="sslc"
                name="sslc"
                className="sr-only"
              />
            </div>
          </div>
        </div>

        {/* ACTIONS */}

        {/* {  Object.keys(errors).length != 0 && <p className="text-sm text-red-600">Please fill all required fields</p>} */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-5 border-t">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleBackToVerification}
          >
            Back to Verification
          </Button>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Submit Enrollment
          </Button>
        </div>
      </div>
    </div>
  );
}




const FormInput = ({ label, id, name, value, onChange, error, type = "text" }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={error && value === ''? "border-red-500" : ""}
      />
      
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};