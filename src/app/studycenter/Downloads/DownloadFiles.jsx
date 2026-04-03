import FileDownload from "@/components/studycenterComponents/DownloadsFile/FileDownload";
import { DocDownload } from "@/components/studycenterComponents/DownloadsFile/DocDownload";
import React from "react";

function DownloadFiles() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold">Documents for Download</h1>
        {/* <p className="text-sm text-muted-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi labore atque nostrum perspiciatis cupiditate, at, dolorum molestiae dolor inventor</p> */}
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
      <FileDownload
        title="Student Data"
        desc="Download the Student Data for the current semester"
        comp={
          <DocDownload
            name="Student Data"
            // fields={[
            // ]}
          />
        }
      />
      <FileDownload
        title="Attendance Register"
        desc="Download the attendance register for the current semester"
        comp={
          <DocDownload
            name="Attendance Register"
            date={true}
            fields={[
              "Subject 1",
              "Subject 2",
              "Subject 3",
              "Subject 4",
              "Subject 5",
              "Subject 6",
              "Online / Offline",
            ]}
          />
        }
      />
      <FileDownload
        title="Attendence Report"
        desc="Download the Attendence Report for the current semester"
        comp={
          <DocDownload
            name="Attendence Report"
            fields={[
              "Working  Days",
              "Present",
              "Percentage",
              "Mark",
            ]}
          />
        }
      />
      <FileDownload
        title="Internal Mark"
        desc="Download the Internal Mark for the current semester"
        comp={
          <DocDownload
            mark={[4,4,4,4,4,20]}
            name="Internal Mark"
            fields={[
              "Attendance",
              "Assignment",
              'Seminar',
              "Internal Exam 1",
              "Internal Exam 2",
              "Total Mark",
            ]}
          />
        }
      />
      <FileDownload
        title="Reports"
        desc="Download the Reports for the current semester"
        comp={
          <DocDownload
            mark={[25,25,25,25,100]}
            name="Reports"
            fields={[
              "Camp",
              "Tour",
              'Fest',
              "Social Work",
              "Total Mark",
            ]}
          />
        }
      />
      <FileDownload
        title="Mark Sheet"
        desc="Download the marksheet for the current semester"
        comp={
          <DocDownload
            name="Mark Sheet"
            date={true}
            fields={[
              "Subject 1",
              "Subject 2",
              "Subject 3",
              "Subject 4",
              "Subject 5",
              "Subject 6",
              "Total",
            ]}
          />
        }
      />
      <FileDownload
        title="Commision Mark Sheet (PPTTC)"
        desc="Download the commision mark sheet for the current semester"
        comp={
          <DocDownload
            name="Commision Mark Sheet"
            mark={[100,100,100,100,400]}
            fields={[
              "Teaching",
              "Commision & Viva",
              "Reports",
              "Craft",
              "Total",
            ]}
          />
        }
      />
      <FileDownload
        title="Craft & practical work (PPTTC)"
        desc="Download the craft & practical work for the current semester"
        comp={
          <DocDownload
            name="Craft & practical work"
            isLong={true}
            mark={[10,10,10,10,5,10,5,5,5,5,5,5,5,10,100]}
            fields={[
              "Teaching Rec",
              "Assaignment",
              "Seminar",
              "Chart",
              "Flash Card",
              "Waste Material Work",
              "Collection",
              "Natural/ Scrap Album",
              "Wall Friezez",
              "Picture Album",
              "Cutout",
              "Records",
              "LOTTO",
              "Number Weel",
              "Total",
            ]}
          />
        }
      />
      <FileDownload
        title="Commision Mark Sheet (MTTC)"
        desc="Download the commision mark sheet for the current semester"
        comp={
          <DocDownload
            name="Commision Mark Sheet"
            isLong={true}
            mark={[100,100,100,100,100,100,100,100,100,900]}
            fields={[
              "Teaching",
              "Commision & Viva",
              "Reports",
              "Craft",
              "Practical Life Area",
              "Sensorial Area",
              "Language Area",
              "Mathematics Area",
              "Cultural Area",
              "Total",
            ]}
          />
        }
      />
      
      <FileDownload
        title="Teaching Practice Mark Sheet (PPTTC/MTTC)"
        desc="Download the teaching practice mark sheet for the current semester"
        comp={
          <DocDownload
            name="Teaching Practice Mark Sheet"
            mark={[10,50,20,10,10,100]}
            fields={[
              "Introduction",
              "Presentation",
              "Teaching Aids",
              "Language Clarity",
              "Extra Curricular",
              "Total"
              
            ]}
          />
        }
      />
    </div>
    </div>
  );
}

export default DownloadFiles;
