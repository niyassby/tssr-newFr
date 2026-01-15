import React, { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import header from "../../../assets/pdfHead.svg";
import logo from "../../../assets/Logo.svg";
import {
  CheckIcon,
  Printer,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import signature from '../../../assets/signature.png'

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const StudyCentrPDF = forwardRef(({ data, course }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white px-3 rounded-2xl max-w-3xl mx-auto min-h-screen"
    >
      <div className="pb-5 border-b-2 border-black/60">
        <img src={header} alt="" />
      </div>

<div>
<div className="p- 6  ">
        {/* Header */}
        <div className="text-center  mt-3 pb-5 ">
          
          <h1 className="text-2xl uppercase font-semibold text-gray-800">Authorised Training Center</h1>
          <p className="text-lg font-bold text-gray-600">CERTIFICATE</p>
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Center Information */}
          <div className="bg-gray-50 p-6 rounded-lg print:bg-gray-100">
            {/* <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">CENTER INFORMATION</h2> */}

            <div className="grid grid-cols-1 gap-4">
              <div className="flex gap-6 items-end mb-6">
                {data.logo&&<div>
                  <img className="size-28 object-cover border rounded-2xl" src={data.logo} alt="" />
                </div>}
                <div>
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{data.name}</h3>
                <p className="text-lg text-gray-600">
                  ATC ID: <span className="font-semibold">{data.atcId}</span>
                </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500  tracking-wide">
                      Registration Number
                    </span>
                    <span className="text-base font-semibold text-gray-800">{data.regNo}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500  tracking-wide">Center Head</span>
                    <span className="text-base font-semibold text-gray-800">{data.centerHead}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500  tracking-wide">Email Address</span>
                    <span className="text-base font-semibold text-gray-800">{data.email}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500  tracking-wide">Phone Number</span>
                    <span className="text-base font-semibold text-gray-800">{data.phoneNumber}</span>
                  </div> */}

                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500  tracking-wide">Location</span>
                    <span className="text-base font-semibold text-gray-800">{data.place}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500  tracking-wide">District & State</span>
                    <span className="text-base font-semibold text-gray-800">
                      {data.district.toUpperCase()}, {data.state.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500  tracking-wide">Pincode</span>
                  <span className="text-base font-semibold text-gray-800">{data.pincode}</span>
                </div>

                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 pt-2 border-t">
              <h3 className="text-base font-semibold text-gray-800 col-span-full mb-3">Registration Details</h3>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 tracking-wide">Registered Date</span>
                  <span className="text-base font-semibold text-gray-800">{formatDate(data.createdAt)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 tracking-wide">Renewal Date</span>
                  <span className="text-base font-semibold text-gray-800">{formatDate(data.renewalDate)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className=" ">
            <div className="bg-gray-100 p-3 rounded-lg border">
              <h3 className="font-semibold text-blue-800 mb-2">Approved Courses</h3>
              {course?.map((data, i) =>{
                return<span key={i} className="text-sm text-gray-600">
                {data.name}{i !== course.length - 1 ? ", " : ""}
              </span>
              })}
            </div>
          </div>

          {/* Registration Details */}
          <div className=" rounded-lg mt-4 text-right ">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="relative  pl-3">
                <QRCodeSVG size={90} value={'tssr council authorized certificate'}/>
              </div>
              <div className="flex flex-col items-end justify-end ">
                <div className="relative right-9 ">
                  <img className="w-28 object-contain" src={signature} alt="" />
                </div>
                <h1 className="font-medium">CHAIRMAN, TSSR COUNCIL</h1>
                {/* <h1 className="text-sm text-muted-foreground">Central Administrative office</h1> */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-4 border-t border-gray-800">
          <div className="text-center">
            <p className="text-sm text-gray-600 ">
            We here by certify that <span className="font-medium">{data.name}</span> is an Authorised Training Center of TSSR COUNCIL as per the rules & Regulations stipulated by the authority
            </p>
            {/* <p className="text-sm text-gray-600 mb-2">
              This certificate is issued by the TSSR Council 
            </p> */}
            
            <p className="text-xs text-gray-500 p-1">
            Central Administrative office, TSSR Bhavan, Thamarassery, Calicut Kerala, India, Pin - 673 573
            </p>
          </div>
        </div>
      </div>
</div>
     

    
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <img className="w-60" src={logo} alt="" />
      </div>
    </div>
  );
});

export default function CenterPDF({ data, course }) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    contentRef: componentRef,
    documentTitle: `${data.name}`,
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
      <div className="">
        <div className=" ">
          <Button    onClick={handlePrint}>
            <Printer className="w-5 h-5 " />
            Print Data
          </Button>
        </div>
        <div className="bg-white rounded-lg sr-only abs olute inset-0 shadow-2xl overflow-hidden">
          <StudyCentrPDF ref={componentRef} data={data} course={course} />
        </div>
      </div>
  );
}
