
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Phone, Mail, User, Calendar, FileText, Eye, Edit, Trash2, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useOneStudiCenter } from "@/hooks/tanstackHooks/useStudyCentre"
import { useNavigate, useParams } from "react-router-dom"
import { useAllCourse } from "@/hooks/tanstackHooks/useCourse"
import Loader from "@/components/ui/loader"
import { format } from "date-fns-tz"
import CenterPDF from "@/components/admincomp/studycenComp/CenterPDF"



// Sample data based on the provided structure
const studyCenterData = {
  _id: "689c68f7f5a0ce83b53aa66d",
  name: "ABETTA ACADEMY",
  email: "abettaacademy@gmail.com",
  renewalDate: "2025-07-12T18:30:00.000Z",
  phoneNumber: 9526042639,
  place: "moonnampadi, trippanachi",
  pincode: "673641",
  district: "malappuram",
  state: "kerala",
  centerHead: "KHADEEJA PERUMTHODIKA",
  atcId: "ABE/MAL/1124",
  courses: ["689c67adabeba3bd20a0a5b4", "689c67aeabeba3bd20a0a5c2"],
  regNo: "50374",
  isActive: false,
  isApproved: true,
  createdAt: "2025-08-13T10:29:11.368Z",
  updatedAt: "2025-08-18T11:36:11.905Z",
}

const userData = [
  {
    _id: "689c68f7f5a0ce83b53aa66f",
    name: "KHADEEJA PERUMTHODIKA",
    email: "abettaacademy@gmail.com",
    studycenterId: "689c68f7f5a0ce83b53aa66d",
    phoneNumber: "9526042639",
    isActive: true,
  },
]

export function ViewCenter() {
  const { id } = useParams();
  const {data, error, isLoading}=useOneStudiCenter(id)
  const { data: course } = useAllCourse()
  const navigate = useNavigate()

  const userData = data?.user || {}
  const studyCenterData = data?.data || {}
  const availableCourses = course?.data?.filter((course) => studyCenterData?.courses?.includes(course._id))


  if(isLoading) return <div><Loader/></div>
  if(!data.success) return <div>{data.message}</div>

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex max-md:flex-col max-md:text-center gap-4 items-center justify-between">
          <div className="flex max-md:flex-col items-center gap-2">
            {studyCenterData?.logo && <div className="size-28 border rounded-2xl overflow-hidden">
                <img className="w-full h-full object-cover" src={studyCenterData?.logo} alt="" />
            </div>}
            <div>

            <h1 className="text-xl md:text-3xl font-bold text-foreground">{studyCenterData.name}</h1>
            <p className="text-muted-foreground mt-1">Authorized Training Center Registration Details</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            
            <CenterPDF data={studyCenterData} course={availableCourses} />
            <Button onClick={()=>navigate(-1)} variant={'outline'}>Back <ArrowLeft/></Button>
          </div>
        </div>

        {/* Study Center Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Study Center Details</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={studyCenterData.isActive ? "default" : "secondary"}>
                  {studyCenterData.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant={studyCenterData.isApproved ? "default" : "destructive"}>
                  {studyCenterData.isApproved ? "Approved" : "Pending"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b pb-2">Basic Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Center Name</p>
                      <p className="font-medium">{studyCenterData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">ATC ID</p>
                      <p className="font-medium">{studyCenterData.atcId}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Registration No</p>
                      <p className="font-medium">{studyCenterData.regNo}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b pb-2">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{studyCenterData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{studyCenterData.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">
                        {studyCenterData.place}, {studyCenterData.district}, {studyCenterData.state} -{" "}
                        {studyCenterData.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Administrative Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground border-b pb-2">Administrative</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Center Head</p>
                      <p className="font-medium">{studyCenterData.centerHead}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Renewal Date</p>
                      <p className="font-medium">{format(new Date(studyCenterData?.renewalDate || new Date()), "PPP") || ""}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Courses</p>
                      <p className="font-medium">{studyCenterData.courses.length} courses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 pt-6 border-t">
                {availableCourses && availableCourses?.map((course) =>{
                    return (
                        <div className="border rounded-lg p-4">
                            <div>
                                <h1 className="text-sm font-medium text-muted-foreground">Course Name</h1>
                                <p className="font-medium">{course.name}</p>
                                <p className="text-sm text-muted-foreground mt-3">Category : {course.category}</p>
                                <p className="text-sm text-muted-foreground">Duration : {course.duration}</p>
                                <p className="text-sm text-muted-foreground">Subjects : {course?.subjects?.length} subjects</p>
                            </div>
                        </div>
                    )
                })}
              {/* <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Center
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button> */}
            </div>
          </CardContent>
        </Card>

        {/* Associated Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Associated Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData?.map((user) => (
                <div key={user._id} className="flex md:items-center gap-4 max-md:flex-col justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="md:text-right">
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{user.phoneNumber}</p>
                    </div>
                    <Badge variant={user.isActive ? "default" : "secondary"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                    
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="font-medium">{format(new Date(studyCenterData.createdAt  || new Date()), "PPP")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium">{format(new Date(studyCenterData.updatedAt  || new Date()), "PPP")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Record ID</p>
                <p className="font-medium font-mono text-sm">{studyCenterData._id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
