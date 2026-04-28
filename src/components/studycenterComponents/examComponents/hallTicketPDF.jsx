import React, { useState, useEffect } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { HallTicketPDFDocument } from "./HallTicketPDFRenderer";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode";

export default function HallTicketPDF({ studentData }) {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = import.meta.env.VITE_APP_URL || '';
        const dataUrl = await QRCode.toDataURL(url + "/ht-verification/" + studentData?.registrationNo, {
          errorCorrectionLevel: 'M',
          type: 'image/png',
          margin: 0,
          color: {
            dark: '#000000ff',
            light: '#ffffffff'
          }
        });
        setQrCodeUrl(dataUrl);
      } catch (err) {
        console.error(err);
      }
    };
    if (studentData?.registrationNo) {
      generateQR();
    }
  }, [studentData]);

  if (!qrCodeUrl) return <p className="text-sm text-gray-500 text-center animate-pulse pt-4">Generating PDF...</p>;

  return (
    <div className=" flex flex-col items-center justify-center gap-3">
      <div className="flex gap-4">
        <PDFDownloadLink
          document={<HallTicketPDFDocument studentData={studentData} qrCodeUrl={qrCodeUrl} />}
          fileName={`HallTicket_${studentData?.registrationNo || "Download"}.pdf`}
        >
          {({ loading }) => (
            <Button disabled={loading}>
              {loading ? "Preparing PDF..." : "Download PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
      <div className="w-full overflow-auto">
          <PDFViewer showToolbar={false} width="100%" height="600px" >
            <HallTicketPDFDocument studentData={studentData} qrCodeUrl={qrCodeUrl} />
          </PDFViewer>
      </div>
    </div>
  )
}