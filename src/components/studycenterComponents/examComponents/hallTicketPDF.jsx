import React, { forwardRef, useRef } from "react";
import head from "../../../assets/pdfHead.svg"
import logo from '../../../assets/Logo.svg'
import { useReactToPrint } from "react-to-print";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { HallTicketPDFDocument } from "./HallTicketPDFRenderer";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { QRCodeSVG } from "qrcode.react";
import sealimg from '../../../assets/sealpng.png'
const url = import.meta.env.VITE_APP_URL

export const HallTicket = forwardRef(({ studentData }, ref) => {

  return (
    <div ref={ref} className="flex items-center justify-center ">
      {/* A4-sized container (210mm x 297mm) */}
      <div className="w-[200mm] h-[280mm] relative border overflow-hidden border-black p-8 pt-5 bg-white">
        <div className="relative z-10">

          <div className="relative right-5">
            <img src={head} alt="" />
          </div>

          {/* Main Title */}
          <div className="border-b-2 border-black mb-6 pb-3 relative">
            <h2 className="text-xl font-bold uppercase text-center">
              Hall Ticket
            </h2>
          </div>

          {/* Student Information */}
          <div className="grid grid-cols-7 gap-4">
            <div className="space-y-2 mb-8 col-span-5">
              <div className="flex">
                <div className="w-1/3  text-sm">Reg. No:</div>
                <div className="w-2/3 text-sm font-medium ">
                  : {studentData?.registrationNo}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/3  text-sm">Name Of Student</div>
                <div className="w-2/3 text-sm font-medium ">
                  : {studentData?.studentName?.toUpperCase()}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/3  text-sm">Course</div>
                <div className="w-2/3 text-sm font-medium ">
                  : {studentData?.courseName}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/3  text-sm">Study Centre</div>
                <div className="w-2/3 text-sm font-medium ">
                  : {studentData?.studyCenter}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/3  text-sm">Examination Centre</div>
                <div className="w-2/3 text-sm font-medium ">
                  : {studentData?.examCenter}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/3  text-sm">Date of Examination</div>
                <div className="w-2/3 text-sm font-medium ">
                  : {format(new Date(studentData?.examDate.from || 0), "MMM dd, yyyy")} to {format(new Date(studentData?.examDate.to || 0), "MMM dd, yyyy")}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/3  text-sm">Examination Time</div>
                <div className="w-2/3 text-sm font-medium ">
                  : {studentData?.examTime.from} to {studentData?.examTime.to}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-2 col-span-2 ">
              <img className="w-28 h-36  object-cover border rounded-md border-black/70" src={studentData?.profileImage} alt="" />
              <div className="p-1 border border-black/70">
                <QRCodeSVG value={`${url}/ht-verification/${studentData?.registrationNo}`} size={100} />
                <h1 className="text-[10px] font-medium text-center mt-1 uppercase">Scan and verify </h1>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-3 mt-2">
            <h3 className="font-bold text-[16px] border-b inline-block pb-1 mb-3">
              INSTRUCTION FOR THE CANDIDATES APPEARING ON EXAMINATION
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-[13px] ">
              <li>
                This hall ticket is valid only if the candidates photograph and
                signature images are legible.
              </li>
              <li>
                Candidates will be permitted to appear for the examination ONLY
                after their credentials are verified by centre official.
              </li>
              <li>
                Candidates should take their places in the examination hall at
                least 10 minutes before the commencement of the examination.
              </li>
              <li>
                Candidates presenting themselves half an hour after the appointed
                time will not be admitted to the examination hall.
              </li>
              <li>
                Candidates should bring with them their hall ticket each day of the
                examination for inspection.
              </li>
              <li>
                Candidates should fill the facing sheet of the answer book in block
                letters.
              </li>
              <li>
                No candidates will be allowed to leave the examination hall till
                the expiry of half an hour after the commencement of the
                examination.
              </li>
              <li>
                Candidates are prohibited from bringing into the examination hall
                any book or portion of book, manuscript or paper and from
                communicating with any person inside or outside. copying or other
                unfair practices by the candidates is strictly prohibited.
              </li>
              <li>
                When the candidate need supplemental sheets or any other assistance
                he/she should stand up in the place.
              </li>
              <li>
                When the candidate has finished writing he/she shall stand up in
                the place may collect the answer book.
              </li>
            </ul>
          </div>

          {/* Signatures */}
          <div className="flex justify-between mt-8 text-xs text-muted-foreg round">
            <p>Student Signature</p>
            <p>Principal Signature</p>
            <img className="absolute  right-0 bottom-16  size-22 -rotate-45  mix-blend-multiply" src={sealimg} alt="" />
            <div className="relativ e  ">
              <p>Controller Of Examination</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs mt-5 border-2 ring ring-offset-2 border-gray-900 p-2">
            <p>
              ISSUED BY TSSR COUNCIL, OFFICE OF THE CENTRAL BOARD OF EXAMINATION,
            </p>
            <p>CENTRAL ADMINISTRATIVE OFFICE, CALICUT, KERALA</p>
          </div>
        </div>
        <div className="absolute z-0 opacity-10  inset-0 flex justify-center items-center">
          <img className="size-60" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
});


export default function HallTicketPDF({ studentData }) {
  const componentRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    contentRef: componentRef,
    documentTitle: `Hall_Ticket`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.3in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
  })


  return (
    <div className="border py-6 rounded-2xl flex flex-col items-center justify-center gap-3">
      <div className="flex gap-4">
        {/* <Button
          onClick={handlePrint}
          variant="outline"
        >
          Print Hall Ticket
        </Button> */}
        <PDFDownloadLink
          document={<HallTicketPDFDocument studentData={studentData} />}
          fileName={`HallTicket_${studentData?.registrationNo || "Download"}.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading}>
              {loading ? "Preparing PDF..." : "Download PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
      <div className="bg-white w-full overflow-auto">
        <div className="w-f it mx-auto">
        <PDFViewer width="100%" height="600px" >
          <HallTicketPDFDocument studentData={studentData} />
        </PDFViewer>
          {/* <HallTicket ref={componentRef} studentData={studentData} /> */}
        </div>
      </div>
    </div>
  )
}