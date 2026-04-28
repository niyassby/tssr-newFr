import React, { forwardRef, useRef } from "react";
import head from "../../../assets/pdfHead.svg";
import logo from "../../../assets/Logo.svg";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import sealimg from "../../../assets/sealpng.png";
import { cn } from "@/lib/utils";
import { Printer } from "lucide-react";

export const ResultData = forwardRef(({ data, className }, ref) => {
  return (
    <div ref={ref} className="flex items-center justify-center ">
      {/* A4-sized container (210mm x 297mm) */}
      <div className="w-[200mm] h-[280mm] relative border border-black p-8 pt-5 bg-white">
        <div className="relative h-full z-10">
          <div>
            <img src={head} alt="" />
          </div>

          <div className="w-full flex items-center px-4 capitalize justify-center text-center bg-[#253a7c] mt-2 text-white font-medium rounded-sm py-1">
          {data.examName || "Public Examination"} of {data.courseName?.toLowerCase()}
          </div>
 
          {/* Main Title */}
          <div className={cn("flex w-full h -full  flex-col ", className)}>
            <div className={cn("relative text-black")}>
              {/* Header */}
              <header className="relative z-10 mt-3">
                {/* <div className="mt-2 text-center">
                  <h2 className="text-lg font-semibold leading-tight underline">
                    Result
                  </h2>
                </div> */}

                <div className="mt-5 grid grid-cols-3 gap-y-1 gap-x-8 text-[10pt]">
                  <div className="flex gap-2 ">
                    <span className="font-semibold w-[25mm]">Name:</span>
                    <span className="">{data.studentName} </span>
                  </div>
                  <div className="flex gap-2 col-span-2 ">
                    <span className="font-semibold w-[25mm]">
                      Study Center:
                    </span>
                    <span className="">{data.studyCenterName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold w-[25mm]">Reg No:</span>
                    <span className="tabular-nums">{data.admissionNumber}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold w-[25mm] ">Grade:</span>
                    <span className="">{data.grade}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold w-[25mm]">Duration:</span>
                    <span className="">{data.duration}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold w-[25mm]">Remark:</span>
                    <span className="">{data.remark}</span>
                  </div>
                  <div className="flex gap-2 col-span-2">
                    <span className="font-semibold w-[25mm]">Exam Date:</span>
                    <span className="">{data.dateOfExam}</span>
                  </div>
                </div>
              </header>

              {/* Body - Subjects Table */}
              <main className="relative z-10 mt-4">
                <div className=" flex items-center justify-center ">
                <h1 className="text-lg font-semibold leading-tight  bg-[#253a7c] py-0.5 px-5 rounded-t-lg text-white  text-center">
                  Mark List{" "}
                </h1>
                </div>
                <table className="w-full border border-zinc-800 text-[10pt] ">
                  <thead className="bg-zinc-100">
                    <tr>
                      <th className="border-b border-zinc-800 p-2 w-[12mm] text-left">
                        No.
                      </th>
                      <th className="border-b border-l border-zinc-800 p-2 text-left">
                        Subject
                      </th>
                      <th className="border-b border-l border-zinc-800 p-2 w-[22mm] text-left">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.subjects.map((s, idx) => (
                      <tr key={idx} className="">
                        <td className="border-t border-zinc-300 p-2 align-top">
                          {idx + 1}
                        </td>
                        <td className="border-t border-l border-zinc-300 p-2 align-top">
                          {s.name}
                        </td>
                        <td className="border-t border-l border-zinc-300 p-2 align-top font-semibold">
                          {s.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Overall grade summary */}
                <div className="mb-4 mt-1  flex items-center justify-between text-[10pt]">
                  <div>
                    <span className="font-semibold">Overall Grade: </span>
                    <span className="text-[11pt] font-bold">{data.grade}</span>
                  </div>
                  <div className="font-semibold">
                    {data.subjects.length} Subjects
                  </div>
                </div>
              </main>
            </div>

            <div className="absolute w-full bottom-0 left-0">
              {/* Signatures */}
              <div className="flex justify-between text-black  text-sm text-muted-foreg round">
                <p>Principal Signature</p>
                <img
                  className="absolute  right-0 bottom-12  size-24 -rotate-45  mix-blend-multiply"
                  src={sealimg}
                  alt=""
                />
                <div className="relativ e  ">
                  <p>TSST Council</p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-black text-[11px] mt-5 border-2 ring ring-offset-2 border-gray-900 px-2 py-1">
                <p>
                  ISSUED BY TSSR COUNCIL, OFFICE OF THE CENTRAL BOARD OF
                  EXAMINATION
                </p>
                <p>CENTRAL ADMINISTRATIVE OFFICE, CALICUT, KERALA</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute z-0 opacity-10  inset-0 flex justify-center items-center">
          <img className="size-60" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
});

export default function ResultPdf({ result }) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    contentRef: componentRef,
    documentTitle: `Mark_List ${result.studentName}`,
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
  });

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className=" ">
        <Button onClick={handlePrint}>
          <Printer />
          Print / Save PDF
        </Button>
      </div>
      <div className="bg-white w-full overflow-auto">
        <ResultData ref={componentRef} data={result} />
      </div>
    </div>
  );
}
