import React, { forwardRef, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import header from "../../../assets/pdfHead.svg";
import logo from "../../../assets/Logo.svg";
import { Printer } from "lucide-react";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className="text-base text-slate-800">{value || 'N/A'}</span>
  </div>
);

const StaffPdfDesign = forwardRef(({ data}, ref) => {
  const {
    name,
    staffId,
    designation,
    department,
    phoneNumber,
    email,
    dob,
    age,
    gender,
    qualification,
    address,
    profileImage
  } = data;

  const fullAddress = `${address.place}, ${address.district}, ${address.state} - ${address.pincode}`;
  return (
    <div
      ref={ref}
      className="bg-white px-3 rounded-2xl max-w-3xl mx-auto min-h-screen border border-black p-3"
    >
      <div className="pb-5 border-b-2 border-black/60">
        <img src={header} alt="" />
      </div>

      <div className="bg-slate-100 p-8 font-sans print:bg-white">
      
      {/* The A4-sized sheet with shadow. Print styles remove shadow and margins. */}
      <div 
      >
        <main className="flex flex-col h-full">
          {/* == HEADER SECTION == */}
          <header className="flex items-center  gap-10">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 overflow-hidden border  rounded-full">
                <img src={profileImage} className="w-full h-full object-cover" alt="" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 capitalize tracking-tight">{name}</h1>
              <h2 className="text-sm font-medium text-neutral-600 capitalize mt-1">{designation}</h2>
              <p className="text-sm text-slate-500 mt-2">Staff ID: {staffId}</p>
            </div>
          </header>

          {/* == BODY SECTION == */}
          <div className="flex-grow py-8">
            {/* Personal Information Section */}
            <section className="mb-10">
              <h3 className="text-lg font-semibold text-slate-700 border-b pb-2 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <DetailItem label="Date of Birth" value={formatDate(dob)} />
                <DetailItem label="Age" value={age} />
                <DetailItem label="Gender" value={gender?.charAt(0).toUpperCase() + gender?.slice(1)} />
                <DetailItem label="Qualification" value={qualification} />
              </div>
            </section>

            {/* Contact & Department Section */}
            <section>
              <h3 className="text-lg font-semibold text-slate-700 border-b pb-2 mb-4">
                Contact & Work Details
              </h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <DetailItem label="Email Address" value={email} />
                <DetailItem label="Phone Number" value={phoneNumber} />
                <DetailItem label="Department" value={department} />
                <DetailItem label="Address" value={fullAddress} />
              </div>
            </section>
          </div>
          
          {/* == FOOTER SECTION == */}
          <footer className="mt-auto pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400">
              Document generated on {new Date().toLocaleDateString('en-GB')}
            </p>
          </footer>
        </main>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-800">
          <div className="text-center">
            
            <p className="text-sm text-gray-600 mb-2">
              This certificate is issued by the TSSR Council 
            </p>
            
            <p className="text-xs text-gray-500 mt-2 p-1">
            Corporate office, TSSR Bhavan, Thamarassery, Calicut Kerala, India, Pin -  673 573
            </p>
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

export default function StaffPDF({ data }) {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    contentRef: componentRef,
    documentTitle: `StudyCenter`,
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
        <Button className='w-full  cursor-pointer' onClick={handlePrint}>
          <Printer className="w-5 h-5 " />
          Print Data
        </Button>
      </div>
      <div className="bg-white rounded-lg sr-only shadow-2xl overflow-hidden">
        <StaffPdfDesign ref={componentRef} data={data}  />
      </div>
    </div>
  );
}
