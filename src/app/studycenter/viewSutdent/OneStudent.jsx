// ... code from previous commit was commented out... 

import React from 'react';
import { format } from 'date-fns';
import { User, Phone, GraduationCap, FileText, Download, CheckCircle, Clock, ArrowLeft, Building, Calendar, Award, BookOpen, Star, ShieldCheck, FileCheck2, Fingerprint, MapPin } from "lucide-react";
import StudentPDF from './StudentPDF';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useOneStudent } from '@/hooks/tanstackHooks/useStudents';


// Simple placeholder for the Loader component
const Loader = () => (
  <div className="flex flex-col items-center justify-center gap-2">
    <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
    <p className="text-muted-foreground">Loading Student Data...</p>
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

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const isEnrolled = searchParams.get('isEnroll');
  const { data, error, isLoading } = useOneStudent(id, isEnrolled)

  const student = data?.data

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full h-screen bg-background'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center w-full h-screen bg-background text-destructive'>
        Error loading student data. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] p-4 sm:p-6 lg:p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* -- Header Section -- */}
        <header className="bg-primary rounded-2xl shadow-lg p-6 md:p-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-zinc-100/10 rounded-full"></div>
          <div className="absolute -bottom-12 -left-8 w-48 h-48 bg-zinc-100/10 rounded-full"></div>

          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <img
              src={student.profileImage || "https://static.vecteezy.com/system/resources/thumbnails/055/581/121/small_2x/default-profile-picture-icon-avatar-photo-placeholder-illustration-vector.jpg"}
              alt={student.name}
              className="w-32 h-32 rounded-full border-4 border-primary-foreground/20 shadow-md object-cover bg-background"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{student.name?.toUpperCase()}</h1>
              <p className="text-primary-foreground/80 mt-1">Register No: <span className="font-semibold text-primary-foreground">{student.admissionNumber}</span></p>
              <div className="mt-4 flex items-center justify-center md:justify-start gap-3 flex-wrap">
                {getStatusBadge(student.isCompleted, student.isPassed, student.isCertificateIssued)}
                <Badge className="border border-primary-foreground/20 text-primary-foreground bg-primary-foreground/10 backdrop-blur-sm shadow-none font-normal">
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  {student.courseName}
                </Badge>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2 z-50">
            <StudentPDF studentData={student} />
            <Button onClick={() => navigate(-1)} size='icon' className="bg-primary-foreground/10 text-primary-foreground rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/20 px-2 py-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* -- Main Content Grid -- */}
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* -- Left Column -- */}
          <div className="lg:col-span-1 space-y-8">
            <InfoCard title="Contact Information" icon={<Phone className="w-5 h-5" />}>
              <InfoItem label="Phone Number" value={student.phoneNumber} />
              <InfoItem label="Email Address" value={student.email} />
              <InfoItem label="Aadhaar Number" value={student.adhaarNumber} icon={<Fingerprint className="w-4 h-4 text-muted-foreground pl-0.5" />} />
              <InfoItem label="Address" value={`${student?.houseName ? `${student?.houseName}, ` : ''}${student.place}, ${student.district}, ${student.state} - ${student.pincode}`} icon={<MapPin className="w-4 h-4 text-muted-foreground pl-0.5" />} />
            </InfoCard>

            <InfoCard title="Documents" icon={<FileText className="w-5 h-5" />}>
              <DocumentButton url={student.sslc} label="SSLC Certificate" />
              <DocumentButton url={student.profileImage} label="Profile Image" />
            </InfoCard>
          </div>

          {/* -- Right Column -- */}
          <div className="lg:col-span-2 space-y-8">
            <InfoCard title="Personal Information" icon={<User className="w-5 h-5" />}>
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
                <InfoItem label="Study Center" value={student.studycenter} icon={<Building className="w-4 h-4 text-muted-foreground pl-0.5" />} />
                <InfoItem label="Academic Year" value={student.year} icon={<Calendar className="w-4 h-4 text-muted-foreground pl-0.5" />} />
              </div>
            </InfoCard>

          </div>
          <div className='col-span-full'>
            {/* Status Timeline */}
            {typeof student.isCompleted != "string" ? (
              <InfoCard title="Academic Progress" icon={<Star className="w-5 h-5" />}>
                <div className="flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  {!student.isCompleted && !student.isPassed ? <StatusStep icon={<BookOpen />} title="In Progress" active={!student.isCompleted && !student.isPassed} /> :
                    <StatusStep icon={<FileCheck2 />} title="Course Completed" active={student.isCompleted && !student.isPassed} done={student.isCompleted} />}
                  <StatusStep icon={<Award />} title="Passed Exam" active={student.isPassed && !student.isCertificateIssued} done={student.isCompleted && student.isPassed} />
                  <StatusStep icon={<ShieldCheck />} title="Certificate Issued" active={student.isCertificateIssued} done={student.isCompleted && student.isPassed && student.isCertificateIssued} />
                </div>
              </InfoCard>
            ) : (
              <InfoCard title="Status Overview" icon={<Clock className="w-5 h-5" />}>
                <p className='text-sm text-muted-foreground'>The student's enrollment is currently <span className="font-semibold text-foreground">{student.isCompleted}</span> and is waiting for approval.</p>
              </InfoCard>
            )}

          </div>
        </main>

        {/* -- Footer -- */}
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <p>Student ID: {student._id}</p>
        </footer>
      </div>
    </div>
  );
}

const InfoCard = ({ title, icon, children }) => (
  <div className="bg-card border border-border/60 rounded-xl shadow-sm">
    <div className="px-6 py-4 border-b border-border/60">
      <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-3">
        <span className="text-primary">{icon}</span>
        <span>{title}</span>
      </h3>
    </div>
    <div className="p-6 space-y-4">
      {children}
    </div>
  </div>
);

const InfoItem = ({ label, value, icon }) => (
  <div className="flex items-start gap-2.5">
    {icon && <div className="mt-1 flex-shrink-0">{icon}</div>}
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <p className="text-sm font-medium text-foreground">{value || 'N/A'}</p>
    </div>
  </div>
);

const DocumentButton = ({ url, label }) => (
  <Button
    className="w-full flex items-center gap-2 bg-muted/50 border border-border/50 hover:bg-muted text-foreground text-sm font-normal shadow-sm"
    onClick={() => url && window.open(url, "_blank")}
    disabled={!url}
  >
    <Download className="w-4 h-4 text-muted-foreground" />
    {label}
  </Button>
);

const StatusStep = ({ icon, title, active, done }) => {
  const baseClasses = "flex-1 text-center p-3 rounded-lg transition-all duration-300";
  const activeClasses = "bg-primary text-primary-foreground shadow-md scale-105";
  const doneClasses = "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";
  const inactiveClasses = "bg-muted text-muted-foreground";

  const getClasses = () => {
    if (active && !done) return `${baseClasses} ${activeClasses}`;
    if (done) return `${baseClasses} ${doneClasses}`;
    return `${baseClasses} ${inactiveClasses}`;
  };

  return (
    <div className={getClasses()}>
      <div className="flex justify-center flex-shrink-0 items-center w-8 h-8 mx-auto bg-background/20 rounded-full mb-1">
        {icon}
      </div>
      <p className="text-xs font-semibold">{title}</p>
    </div>
  );
};

const getStatusBadge = (isCompleted, isPassed, isCertificateIssued) => {
  if (typeof isCompleted === "string") {
    return (
      <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20 py-1.5 px-3 text-sm shadow-none font-normal">
        <Clock className="w-4 h-4 mr-1.5" />
        {isCompleted}
      </Badge>
    );
  }
  if (isCertificateIssued) {
    return (
      <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 py-1.5 px-3 text-sm shadow-none font-normal">
        <CheckCircle className="w-4 h-4 mr-1.5" />
        Certificate Issued
      </Badge>
    );
  }
  if (isPassed) {
    return (
      <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/20 py-1.5 px-3 text-sm shadow-none font-normal">
        <Award className="w-4 h-4 mr-1.5" />
        Passed
      </Badge>
    );
  }
  if (isCompleted) {
    return (
      <Badge className="bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 py-1.5 px-3 text-sm shadow-none font-normal">
        <FileCheck2 className="w-4 h-4 mr-1.5" />
        Course Completed
      </Badge>
    );
  }
  return (
    <Badge className="bg-muted text-foreground border border-border py-1.5 px-3 text-sm shadow-none font-normal">
      <Clock className="w-4 h-4 mr-1.5 text-muted-foreground" />
      In Progress
    </Badge>
  );
};

export default OneStudent;

