// import { Button } from '@/components/ui/button'
// import Loader from '@/components/ui/loader'
// import { useOneStudent } from '@/hooks/tanstackHooks/useStudents'
// import { format } from 'date-fns'
// import { formateDateToIST } from '@/lib/formateDate'
// import React, { useEffect } from 'react'
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { User, Phone, Mail, MapPin, GraduationCap, FileText, Download, CheckCircle, XCircle, Clock, Loader2, ArrowLeft } from "lucide-react"
// import { Call02Icon, Location01Icon, MailOpen01Icon, StudentCardIcon } from 'hugeicons-react'
// import StudentPDF from './StudentPDF' 
 
 

// function OneStudent() {
//   // const {id} = useParams()
//   const [searchParams ] = useSearchParams();
//   const id = searchParams.get('id');
//   const isEnrolled = searchParams.get('isEnroll');
//   const {data, error, isLoading} = useOneStudent(id, isEnrolled)
//   const navigate = useNavigate() 
 
//   const student = data?.data
 

//   if(isLoading) return <div className='w-full h-full'><Loader/></div>
//   if(error) return <div>Error</div>
  

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-6xl mx-auto  grid md:grid-cols-3 gap-6">
//         {/* Header Section */}
//         <div className="overflow-hidden p-0 rounded-4xl border max-h-1/2">
//           <div className="bg-neutral-800 px-6 py-10  w-full h-full">
//               <div className="flex items-center w-full justify-center">
//                 <img
//                   src={student.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/055/581/121/small_2x/default-profile-picture-icon-avatar-photo-placeholder-illustration-vector.jpg"}
//                   alt={student.name}
//                   className="size-28 rounded-full bg-white border-2 border-white/80 object-cover"
//                 />
//               </div>
//             <div className="mt-3 w-full flex flex-col items-center justify-center">
//                 <h1 className="text-2xl font-semibold text-white ">{student.name?.toUpperCase()}</h1>
//                 <p className="text-sm mb-3 text-white font-light ">Admission No : {student.admissionNumber}</p>
//               <div className="flex flex-col items-center justify-center gap-2 mt-5">
//                   {getStatusBadge(student.isCompleted, student.isPassed, student.isCertificateIssued)}
//                   <h1 className="bg-white/10 text-white whitespace-normal text-sm text-center p-1 rounded-2xl mt- border-white/20">
//                     {student.courseName}
//                   </h1>
//               </div>
//             </div>
//             <div className=''>
//             <Button onClick={()=>navigate(-1)} size='icon' variant='outline'><ArrowLeft/></Button>
//             <StudentPDF studentData={student}/>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 col-span-2">
//           {/* Personal Information */}
//           <div className="lg:col-span-full space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   Personal Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-medium text-gray-500">Full Name</label>
//                     <p className="text-gray-900 font-medium">{student?.name?.toUpperCase()}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-500">Age</label>
//                     <p className="text-gray-900 font-medium">{student.age} years</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-500">Date of Birth</label>
//                     <p className="text-gray-900 font-medium">{formateDateToIST(student.dateOfBirth, 'PPP')}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-500">Gender</label>
//                     <p className="text-gray-900 font-medium">{student.gender}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-500">Parent/Guardian</label>
//                     <p className="text-gray-900 font-medium">{student.parentName}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-500">Qualification</label>
//                     <p className="text-gray-900 font-medium">{student.qualification}</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Contact Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Phone className="w-5 h-5" />
//                   Contact Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex gap-3">
//                     <Call02Icon size={20} className="text-muted-foreground" />
//                     <div>
//                       <label className="text-sm text-gray-500">Phone Number</label>
//                       <p className="text-gray-900 font-medium">{student.phoneNumber}</p>
//                     </div>
//                   </div>
//                   <div className="flex gap-3">
//                     <MailOpen01Icon size={20} className="text-muted-foreground" />
//                     <div>
//                       <label className="text-sm text-gray-500">Email</label>
//                       <p className="text-gray-900 font-medium">{student.email}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Location01Icon size={20} className="text-muted-foreground mt-1" />
//                   <div>
//                     <label className="text-sm text-gray-500">Address</label>
//                     <p className="text-gray-900 font-medium">
//                     {student?.houseName ? `${student?.houseName},`:''} {student.place}, {student.district}, {student.state} - {student.pincode}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <StudentCardIcon size={20} className="text-muted-foreground mt-1" />
//                 <div>
//                   <label className="text-sm text-gray-500">Aadhaar Number</label>
//                   <p className="text-gray-900 font-medium">{student.adhaarNumber}</p>
//                 </div>
                  
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Academic Information & Status */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <GraduationCap className="w-5 h-5" />
//                   Academic Details
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div>
//                   <label className="text-sm text-gray-500">Course</label>
//                   <p className="text-gray-900 font-medium">{student.courseName}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-500">Duration</label>
//                   <p className="text-gray-900 font-medium">{student.duration}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-500">Batch Month</label>
//                   <p className="text-gray-900">
//                     {student.batchMonth} {student.year}
//                   </p>
//                 </div>
//                 {/* <div>
//                   <label className="text-sm text-gray-500">Date of Admission</label>
//                   <p className="text-gray-900">{format(new Date(student.dateOfAdmission), 'PPP')}</p>
//                 </div> */}
//                 <div>
//                   <label className="text-sm text-gray-500">Enrolled Date</label>
//                   <p className="text-gray-900">{format(new Date(student.enrolledDate), 'PPP')}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-500">Study Center</label>
//                   <p className="text-gray-900">{student.studycenter}</p>
//                 </div>
//               </CardContent>
//             </Card>

            
//           </div>
//           <div className='space-y-5'>
//             {/* Status Overview */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Status Overview</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 {typeof student.isCompleted != "string" ?<>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">Course Completed</span>
//                   {student.isCompleted ? (
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500" />
//                   )}
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">Examination Passed</span>
//                   {student.isPassed ? (
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500" />
//                   )}
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-gray-600">Certificate Issued</span>
//                   {student.isCertificateIssued ? (
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                   ) : (
//                     <XCircle className="w-5 h-5 text-red-500" />
//                   )}
//                 </div>
//                 </>:
//                 <div>
//                 <h1 className='text-sm text-muted-foreground'>Waiting for approval
//                 </h1>
//                 </div>
//                 }
//               </CardContent>
//             </Card>

//             {/* Documents */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <FileText className="w-5 h-5" />
//                   Documents
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start"
//                   onClick={() => window.open(student.sslc, "_blank")}
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   SSLC Certificate
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start"
//                   onClick={() => window.open(student.profileImage, "_blank")}
//                 >
//                   <Download className="w-4 h-4 mr-2" />
//                   Profile Image
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Footer Info */}
//         <Card className='col-span-full'>
//           <CardContent className="pt-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-gray-500">
//               <div>
//                 <p>Student ID: {student._id}</p>
//                 {/* <p>Created: {format(new Date(student.createdAt), 'PPP')}</p> */}
//               </div>
//               <div className="text-right">
//                 {/* <p>Last Updated: {format(new Date(student.updatedAt), 'PPP')}</p> */}
//                 <p>Academic Year: {student.year}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
  
  
// }

// export default OneStudent


// const getStatusBadge = (isCompleted, isPassed, isCertificateIssued) => {
//   if(typeof isCompleted === "string"){
//     return (
//       <Badge variant="secondary"  >
//       <Clock className="w-3 h-3 mr-1" />
//       {isCompleted}
//     </Badge>
//     )
//   }
//   if (isCertificateIssued) {
//     return (
//       <Badge className="bg-green-100 text-green-800 hover:bg-green-100 uppercase rounded-full">
//         <CheckCircle className="w-3 h-3 mr-1" />
//         Certificate Issued
//       </Badge>
//     )
//   }
//   if (isPassed) {
//     return (
//       <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 uppercase rounded-full">
//         <CheckCircle className="w-3 h-3 mr-1" />
//         Passed
//       </Badge>
//     )
//   }
//   if (isCompleted) {
//     return (
//       <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 uppercase rounded-full">
//         <Clock className="w-3 h-3 mr-1" />
//         Completed
//       </Badge>
//     )
//   }
//   return (
//     <Badge variant="secondary" className='uppercase rounded-full'>
//       <Clock className="w-3 h-3 mr-1" />
//       In Progress
//     </Badge>
//   )
// }

import React from 'react';
import { format } from 'date-fns';
import { User, Phone, GraduationCap, FileText, Download, CheckCircle, Clock, ArrowLeft, Building, Calendar, Award, BookOpen, Star, ShieldCheck, FileCheck2, Fingerprint, MapPin } from "lucide-react";
import StudentPDF from './StudentPDF';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useOneStudent } from '@/hooks/tanstackHooks/useStudents';
 

// Simple placeholder for the Loader component
const Loader = () => (
  <div className="flex flex-col items-center justify-center gap-2">
    <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
    <p className="text-slate-600">Loading Student Data...</p>
  </div>
);


// Simple placeholder for the Button component
const Button = ({ children, onClick, variant = 'primary', size = 'normal', className = '' }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${className}`}>
        {children}
    </button>
);

// Simple placeholder for the Badge component
const Badge = ({ children, className = '' }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
        {children}
    </span>
);


const formateDateToIST = (date, formatString) => {
    try {
        return format(new Date(date), formatString);
    } catch (e) {
        return "Invalid Date";
    }
}

// --- MAIN COMPONENT ---

function OneStudent() {
  const navigate = useNavigate();
   
  const [searchParams ] = useSearchParams();
  const id = searchParams.get('id');
  const isEnrolled = searchParams.get('isEnroll');
  const {data, error, isLoading} = useOneStudent(id, isEnrolled)
 
  const student = data?.data

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full h-screen bg-slate-50'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center w-full h-screen bg-slate-50 text-red-600'>
        Error loading student data. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* -- Header Section -- */}
        <header className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-12 -left-8 w-48 h-48 bg-white/5 rounded-full"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <img
              src={student.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/055/581/121/small_2x/default-profile-picture-icon-avatar-photo-placeholder-illustration-vector.jpg"}
              alt={student.name}
              className="w-32 h-32 rounded-full border-4 border-white/50 shadow-md object-cover bg-white"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{student.name?.toUpperCase()}</h1>
              <p className="text-slate-300 mt-1">Register No: <span className="font-semibold text-white">{student.admissionNumber}</span></p>
              <div className="mt-4 flex items-center justify-center md:justify-start gap-3 flex-wrap">
                {getStatusBadge(student.isCompleted, student.isPassed, student.isCertificateIssued)}
                <Badge variant="outline" className="border-white/20 text-white bg-white/10 backdrop-blur-sm">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  {student.courseName}
                </Badge>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2 z-50">
             <StudentPDF studentData={student}/>
             <Button onClick={() => navigate(-1)} size='icon' variant='outline' className="bg-white/10 text-white rounded-full border-white/20 hover:bg-white/20">
                <ArrowLeft className="w-5 h-5"/>
             </Button>
          </div>
        </header>

        {/* -- Main Content Grid -- */}
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* -- Left Column -- */}
          <div className="lg:col-span-1 space-y-8">
            <InfoCard title="Contact Information" icon={<Phone className="w-5 h-5"/>}>
                <InfoItem label="Phone Number" value={student.phoneNumber} />
                <InfoItem label="Email Address" value={student.email} />
                <InfoItem label="Aadhaar Number" value={student.adhaarNumber} icon={<Fingerprint className="w-4 h-4 text-slate-400" />} />
                <InfoItem label="Address" value={`${student?.houseName ? `${student?.houseName}, ` : ''}${student.place}, ${student.district}, ${student.state} - ${student.pincode}`} icon={<MapPin className="w-4 h-4 text-slate-400" />} />
            </InfoCard>

            <InfoCard title="Documents" icon={<FileText className="w-5 h-5"/>}>
                <DocumentButton url={student.sslc} label="SSLC Certificate" />
                <DocumentButton url={student.profileImage} label="Profile Image" />
            </InfoCard>
          </div>

          {/* -- Right Column -- */}
          <div className="lg:col-span-2 space-y-8">
            <InfoCard title="Personal Information" icon={<User className="w-5 h-5"/>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <InfoItem label="Full Name" value={student?.name?.toUpperCase()} />
                <InfoItem label="Age" value={`${student.age} years`} />
                <InfoItem label="Date of Birth" value={formateDateToIST(student.dateOfBirth, 'PPP')} />
                <InfoItem label="Gender" value={student.gender} />
                <InfoItem label="Parent/Guardian" value={student.parentName} />
                <InfoItem label="Qualification" value={student.qualification} />
              </div>
            </InfoCard>

             <InfoCard title="Academic Details" icon={<GraduationCap className="w-5 h-5" />}>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <InfoItem label="Course" value={student.courseName} />
                <InfoItem label="Duration" value={student.duration} />
                <InfoItem label="Batch" value={`${student.batchMonth} ${student.year}`} />
                <InfoItem label="Enrolled Date" value={format(new Date(student.enrolledDate), 'PPP')} />
                <InfoItem label="Study Center" value={student.studycenter} icon={<Building className="w-4 h-4 text-slate-400" />} />
                <InfoItem label="Academic Year" value={student.year} icon={<Calendar className="w-4 h-4 text-slate-400" />} />
              </div>
            </InfoCard>

          </div>
          <div className='col-span-full'>
            {/* Status Timeline */}
             {typeof student.isCompleted != "string" ? (
                <InfoCard title="Academic Progress" icon={<Star className="w-5 h-5"/>}>
                    <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        {!student.isCompleted && !student.isPassed ? <StatusStep icon={<BookOpen />} title="In Progress" active={!student.isCompleted && !student.isPassed} />:
                        <StatusStep icon={<FileCheck2 />} title="Course Completed" active={student.isCompleted && !student.isPassed} done={student.isCompleted} />}
                        <StatusStep icon={<Award />} title="Passed Exam" active={student.isPassed && !student.isCertificateIssued} done={student.isCompleted && student.isPassed} />
                        <StatusStep icon={<ShieldCheck />} title="Certificate Issued" active={student.isCertificateIssued} done={student.isCompleted && student.isPassed && student.isCertificateIssued} />
                    </div>
                </InfoCard>
             ) : (
                <InfoCard title="Status Overview" icon={<Clock className="w-5 h-5"/>}>
                    <p className='text-sm text-slate-500'>The student's enrollment is currently <span className="font-semibold text-slate-700">{student.isCompleted}</span> and is waiting for approval.</p>
                </InfoCard>
             )}

          </div>
        </main>
        
        {/* -- Footer -- */}
        <footer className="mt-8 text-center text-xs text-slate-400">
            <p>Student ID: {student._id}</p>
        </footer>
      </div>
    </div>
  );
}

const InfoCard = ({ title, icon, children }) => (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200/80">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                {icon}
                <span>{title}</span>
            </h3>
        </div>
        <div className="p-6 space-y-4">
            {children}
        </div>
    </div>
);

const InfoItem = ({ label, value, icon }) => (
    <div className="flex items-start gap-3">
      {icon && <div className="mt-1">{icon}</div>}
      <div>
        <label className="text-xs text-slate-500">{label}</label>
        <p className="text-sm font-medium text-slate-900">{value || 'N/A'}</p>
      </div>
    </div>
);

const DocumentButton = ({ url, label }) => (
    <Button
        variant=""
        className="w-full flex items-center gap-2 bg-neutral-50 border border-neutral-100 hover:bg-neutral-100 text-sm "
        onClick={() => url && window.open(url, "_blank")}
        disabled={!url}
    >
        <Download className="w-4 h-4" />
        {label}
    </Button>
);

const StatusStep = ({ icon, title, active, done }) => {
    const baseClasses = "flex-1 text-center p-3 rounded-lg transition-all duration-300";
    const activeClasses = "bg-blue-600 text-white shadow-md scale-105";
    const doneClasses = "bg-green-100 text-green-800";
    const inactiveClasses = "bg-slate-100 text-slate-500";

    const getClasses = () => {
        if (active && !done) return `${baseClasses} ${activeClasses}`;
        if (done) return `${baseClasses} ${doneClasses}`;
        return `${baseClasses} ${inactiveClasses}`;
    };

    return (
        <div className={getClasses()}>
            <div className="flex justify-center items-center w-8 h-8 mx-auto bg-white/20 rounded-full mb-1">
                {icon}
            </div>
            <p className="text-xs font-semibold">{title}</p>
        </div>
    );
};

const getStatusBadge = (isCompleted, isPassed, isCertificateIssued) => {
  if (typeof isCompleted === "string") {
    return (
      <Badge className="bg-amber-100 text-amber-800 border-amber-300/50 py-1.5 px-3 text-sm">
        <Clock className="w-4 h-4 mr-1.5" />
        {isCompleted}
      </Badge>
    );
  }
  if (isCertificateIssued) {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-300/50 py-1.5 px-3 text-sm">
        <CheckCircle className="w-4 h-4 mr-1.5" />
        Certificate Issued
      </Badge>
    );
  }
  if (isPassed) {
    return (
      <Badge className="bg-sky-100 text-sky-800 border-sky-300/50 py-1.5 px-3 text-sm">
        <Award className="w-4 h-4 mr-1.5" />
        Passed
      </Badge>
    );
  }
  if (isCompleted) {
    return (
      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300/50 py-1.5 px-3 text-sm">
        <FileCheck2 className="w-4 h-4 mr-1.5" />
        Course Completed
      </Badge>
    );
  }
  return (
    <Badge className="bg-slate-200 text-slate-800 border-slate-300/50 py-1.5 px-3 text-sm">
      <Clock className="w-4 h-4 mr-1.5" />
      In Progress
    </Badge>
  );
};

export default OneStudent;

