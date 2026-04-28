import ClosedAdmission from "@/components/admincomp/admissionComp/ClosedAdmission";
import ManageAdmission from "@/components/admincomp/admissionComp/ManageAdmission";
import OpenADList from "@/components/admincomp/admissionComp/OpenADList";
import SheduledAdmission from "@/components/admincomp/admissionComp/SheduledAdmission";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AdmissionSection() {
  return (
    <div>
      <ManageAdmission />

      <Tabs defaultValue="Active" className="w-full mt-5">
        <TabsList className="h-11 space-x-2 bg-transparent">
          <TabsTrigger
            className="bg-muted px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="Active"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            className="bg-muted px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="schedule"
          >
            Schedule
          </TabsTrigger>
          <TabsTrigger
            className="bg-muted px-3 data-[state=active]:bg-primary data-[state=active]:text-secondary cursor-pointer"
            value="Closed"
          >
            Closed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Active">
          <OpenADList />
        </TabsContent>
        <TabsContent value="schedule">
          <SheduledAdmission />
        </TabsContent>
        <TabsContent value="Closed">
          <ClosedAdmission />{" "}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdmissionSection;
