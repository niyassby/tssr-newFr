import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useState } from "react";
import { DateInputs, FormInputs } from "./CreateStudy";
import { MultiSelect } from "@/components/ui/multiselect";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useUpdateSutdyCenter } from "@/hooks/tanstackHooks/useStudyCentre";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { EditAdminPopup } from "./EditAdminPopup";
import { states } from "@/lib/list";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Delete01Icon, Upload04Icon } from "hugeicons-react";
import { deleteByUrl, useFirebaseUpload } from "@/hooks/useFirebaseUpload";

export function EditStudy({ data, course, users }) {
  const { uploadFile, progress, uploading, error: uploadError } = useFirebaseUpload();
  const [file, setFile] = useState(null)
  const [isLoading, setLoading]=useState(false)

  const [isError, setError] = useState(false);
  const [admins, setAdmins] = useState([])
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [centerAdmin, setCenterAdmin]=useState({})
  const {mutate}=useUpdateSutdyCenter()
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
    isActive: true,
    isApproved: true,
  });
 
  useEffect(() => {
    setFormData({ ...formData, renewalDate: date, courses: selected });
  }, [date, selected]);

  useEffect(() => {
    if(data){
      const properState =
      states.find((s) => s.state.toLowerCase() === data?.state?.toLowerCase())?.state?.trim() || "";

    const properDistrict =
      states
        .find((s) => s.state.toLowerCase() === data?.state?.toLowerCase())
        ?.districts.find(
          (d) => d.toLowerCase() === data?.district?.toLowerCase()
        )?.trim() || "";

      setFormData({ ...formData, ...data, state: properState, district: properDistrict});
      setDate(new Date(data.renewalDate));
      setSelected(data.courses);
    }
    setAdmins(users);
  }, [data, users]);

  const handleChange = useMemo(
    () => (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.centerHead === "" ||
      formData.email === "" ||
      formData.phoneNumber === "" ||
      formData.state === "" ||
      formData.district === "" ||
      formData.place === "" ||
      formData.pincode === "" ||
      selected.length === 0
    ) {
      setError(true);
    }
    setLoading(true)

      if(file){
        var { url } = await uploadFile({
          file: file,
          path: "logo",
        });
  
        if(url){
          if(data?.logo){
            await deleteByUrl(data?.logo)
          }
        }else {
          toast.error("Failed to upload profile image.")
          setLoading(false)
          return

        }
      }
    const submitData = {
      ...formData,
      users: admins,
      logo: url,
    }
    mutate({formData: submitData, id : data._id}, {
      onSuccess: (data) => { 
        setLoading(false)
        if(data.success){
          toast.success(data.message);
          navigate('/admin/studycentre')
        }else{
          toast("Somthing went wrong", {
            description: data.message,});
        }
      }
    })
  }

  // Add in EditStudy component
const [adminDialogOpen, setAdminDialogOpen] = useState(false);
const [adminDialogMode, setAdminDialogMode] = useState("add"); // "add" or "edit"
const [editingIndex, setEditingIndex] = useState(null); // track which admin is being edited

const openAddAdmin = () => {
  setCenterAdmin({ name: "", email: "", phoneNumber: "", password: "" });
  setAdminDialogMode("add");
  setAdminDialogOpen(true);
};

const openEditAdmin = (admin, index) => {
  setCenterAdmin(admin);
  setAdminDialogMode("edit");
  setEditingIndex(index);
  setAdminDialogOpen(true);
};

const handleSetAdmin = (updatedAdmin) => {
  if (!updatedAdmin.name || !updatedAdmin.email || !updatedAdmin.phoneNumber) {
    setError(true);
    return;
  }

  if (adminDialogMode === "edit") {
    const updatedAdmins = [...admins];
    updatedAdmins[editingIndex] = updatedAdmin;
    setAdmins(updatedAdmins);
  } else {
    const isDuplicate = admins.some(
      (a) =>
        a.email === updatedAdmin.email ||
        a.phoneNumber === updatedAdmin.phoneNumber
    );
    if (isDuplicate) {
      toast.error("Admin already exists");
      return;
    }
    setAdmins([...admins, updatedAdmin]);
  }

  // Reset
  setCenterAdmin({});
  setEditingIndex(null);
  setAdminDialogOpen(false);
};

const handldeDlelete = async() => {
  if(data?.logo){
    await deleteByUrl(data?.logo)
    mutate({formData: {...formData, logo: ""}, id : data._id, }, {
      onSuccess: (data) => {
        if(data.success){
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
      },
      onError: () => {
        toast.error('Something went wrong')
      }
    }
    )
  }else{
    toast.error("No image to delete")
  }
}

const imgae = file ? URL.createObjectURL(file) : data?.logo || ""

    

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

  return (
    <div className=" space-y-3 mt-6">
      <div className="flex max-md:flex-col md:items-end gap-2 py-3 ">
        <div className="size-28 border rounded-full overflow-hidden">
                <img
                  src={imgae}
                  className="w-full h-full object-cover"
                  alt=""
                />
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
                <div className="flex gap-2 items-center">
                <label
                  htmlFor="profileImage"
                  className={`border py-2 px-3 inline-flex gap-1 items-center rounded-md cursor-pointer text-sm font-medium  `}
                >
                  <Upload04Icon size={20} /> Upload Logo
                </label>
                <Button onClick={handldeDlelete} variant='outline' size='icon' className='border-red-200 hover:bg-red-500 hover:text-white duration-200 cursor-pointer text-red-500' >
                  <Delete01Icon/>
                </Button>

                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum file size is 1MB. Accepted: JPG, JPEG
                </p>
                
              </div>
        </div>
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
            options={course}
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
        <h1 className="text-lg font-medium mt-4">Permissions</h1>
        <p className="text-sm text-muted-foreground">
          Manage permissions for the study centre
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <SwitchCard
          checked={formData.isActive}
          action={(checked) => setFormData({ ...formData, isActive: checked })}
          title="Activate Status"
          description="Status of the Study Centre"
        />
        <SwitchCard
          checked={formData.isApproved}
          action={(checked) =>
            setFormData({ ...formData, isApproved: checked })
          }
          title="Approvel Status"
          description="Status of the Study Centre"
        />
      </div>

      <div className="mt-6 mb-4 border-t pt-4 flex max-md:flex-col gap-2 justify-between">
        <div>
        <h1 className="text-lg font-medium ">Center Admins</h1>
        <p className="text-sm text-muted-foreground">
          Manage admins of center
        </p>
          
        </div>
          <Button onClick={openAddAdmin}>Add new admin</Button>
      </div>
      <div>
        <div className="space-y-2">
        {admins?.map((admin, index) => (
          <div key={index} className="grid sm:grid-cols-4 items-center md:grid-cols-1 lg:grid-cols-4 gap-2 border py-2 px-4 rounded-lg hover:bg-muted transition-all">
            <h1 className="text-sm font-medium">{admin.name}</h1>
            <h1 className="text-sm text-muted-foreground">{admin.email}</h1>
            <h1 className="text-sm text-muted-foreground">{admin.phoneNumber}</h1>
            <Button className='justify-self-end' size='sm' variant='outline' onClick={() => openEditAdmin(admin, index)}>Edit admin</Button>
          </div>
        ))}
        </div>
        <EditAdminPopup
          isOpen={adminDialogOpen}
          setIsOpen={setAdminDialogOpen}
          admin={centerAdmin}
          onSubmit={handleSetAdmin}
          isError={isError}
          mode={adminDialogMode}
        />
      </div>
      <div className="mt-6 mb-4 border-t">
        <h1 className="text-lg font-medium mt-4">Change Application</h1>
        <p className="text-sm text-muted-foreground mt-1">
          This action will be changed all the information of the study centre
          and it will be effected all data to connected the study centre.
        </p>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <Button onClick={()=>navigate('/admin/studycentre')} variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>{isLoading ? "Saving..." :"Save changes"}</Button>
      </div>
    </div>
  );
}


function SwitchCard({ title, description, checked, action }) {
  return (
    <div>
      <Card
        className={
          "shadow-none p-4 md:p-6 flex flex-row justify-between items-center"
        }
      >
        <div>
          <h1 className="font-medium">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={action} />
      </Card>
    </div>
  );
}



const StateSelect = ({ name, setFormData, formData, error}) => {
  // const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState(
    formData.state ? states.find((item) => item?.state?.toLowerCase() === formData.state?.toLowerCase())?.districts : []
  );

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
        <Select value={formData?.district} onValueChange={(value)=>setFormData({...formData, district:value})} disabled={districts.length === 0}>
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