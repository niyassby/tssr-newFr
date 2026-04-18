// src/app/Routes/AdminRoutes.jsx
import React from "react";
import { Outlet, Route } from "react-router-dom";
import Page from "../admin/page";
import Dashbord from "../admin/dashboard/dashbord";
import { StudyCentre } from "../admin/study centre/studycentre";
import NewStudy from "../admin/study centre/NewStudy";
import EditStudyCen from "../admin/study centre/EditStudyCen";
import Courses from "../admin/Course/Courses";
import AdmissionSection from "../admin/Admission/AdmissionSection";
import ViewStudent from "../studycenter/viewSutdent/viewStudent";
import OneStudent from "../studycenter/viewSutdent/OneStudent";
import StudentsVerification from "../studycenter/viewSutdent/StudentsVerification";
import { EditStudentForm } from "../studycenter/viewSutdent/EditStudentForm";
import ResultPage from "../admin/Result/ResultPage";
import UploadResult from "../admin/Result/UploadResult";
import DownloadFiles from "../studycenter/Downloads/DownloadFiles";
import Gallery from "../admin/Gallery/Gallery";
import Orders from "../admin/Store/Orders";
import Store from "../admin/Store/Store";
import Exams from "../admin/Examination/Exams";
import { CreateExam } from "../../components/admincomp/ExamComp/CreateExam";
import AdminSettings from "../admin/Settings/AdminSettings";
import AdminNotifications from "../admin/Notification/AdminNotifications";
import ManageNotifications from "../../components/studycenterComponents/NotificationComp/ManageNotification";
import ManageStaff from "../admin/Staff/ManageStaff";
import AddNewStaff from "../admin/Staff/AddNewStaff";
import RequestCourse from "../admin/Course/RequestCourse";
import SubjectList from "../admin/Course/SubjectList";
import CenterRequest from "../admin/study centre/CenterRequest";
import FilterContext from "@/Context/FilterContext";
import { ViewCenter } from "../admin/study centre/ViewCenter";
import Resources from "../admin/Gallery/resources";
import Events from "../admin/Event/events";
import CreateEvent from "../admin/Event/createEvent";
import ViewEvent from "../admin/Event/viewEvent";

export default function AdminRoutes() {
  return (
    <Route path="/" element={<Page />}>
      <Route index element={<Dashbord />} />
      <Route path="studycentre" element={<Outlet />}>
        <Route index element={<StudyCentre />} />
        <Route path="req" element={<CenterRequest />} />
        <Route path="add" element={<NewStudy />} />
        <Route path="edit/:id" element={<EditStudyCen />} />
        <Route path="view/:id" element={<ViewCenter />} />
      </Route>
      <Route path="academics" element={<Outlet />}>
        <Route index element={<AdmissionSection />} />
        <Route path="course" element={<Courses />} />
        <Route path="subjects" element={<SubjectList />} />
        <Route path="request" element={<RequestCourse />} />
      </Route>
      <Route path="students" element={<FilterContext><Outlet /></FilterContext>}>
        <Route index element={<ViewStudent />} />
        <Route path="verification" element={<StudentsVerification />} />
        <Route path="view" element={<OneStudent />} />
        <Route path="edit" element={<EditStudentForm />} />
      </Route>
      <Route path="resources" element={<Outlet />}>
        <Route index element={<Resources />} />
        <Route path="downloads" element={<DownloadFiles />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Store />} />
      </Route>
      <Route path="examination" element={<Outlet />}>
        <Route index element={<Exams />} />
        <Route path="create" element={<CreateExam />} />
        <Route path="result" element={<ResultPage />} />
        <Route path="result/upload" element={<UploadResult />} />
      </Route>
      <Route path="event" element={<Outlet />}>
        <Route index element={<Events />} />
        <Route path="create" element={<CreateEvent />} />
        <Route path=":id" element={<ViewEvent />} />
      </Route>
      <Route path="settings" element={<AdminSettings />} />
      <Route path="notifications" element={<Outlet />}>
        <Route index element={<AdminNotifications />} />
        <Route path="manage" element={<ManageNotifications />} />
      </Route>
      <Route path="staff" element={<Outlet />}>
        <Route index element={<ManageStaff />} />
        <Route path="add-staff" element={<AddNewStaff />} />
      </Route>
    </Route>
  );
}
