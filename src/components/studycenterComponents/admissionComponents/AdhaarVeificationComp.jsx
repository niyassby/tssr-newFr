"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckEnrolledOrNot } from "@/hooks/tanstackHooks/useEnrollment";
import { Loader } from "lucide-react";

const AdhaarVeificationComp = ({
  course,
  onNext,
  onBack,
  onFinel,
  setUserData,
}) => {
  const [adhaarNumber, setAdhaarNumber] = useState("");
  const { mutate ,isPending } = useCheckEnrolledOrNot();
  const [error, setError]=useState(null);


  const handleCheck = () => {
    setError(null)
    if (adhaarNumber.trim().length === 14) {
      const cleanAadhaar = adhaarNumber.replace(/\D/g, '');
      mutate(
        { adhaarNumber:cleanAadhaar, ...course },
        {
          onSuccess: (res) => {
            const data = res?.data;
            if (!data) {
              toast.error("Invalid response from server.");
              setError("Invalid response from server.")
              return;
            }
            const { studentExists, enrolled, student } = data;

            if (studentExists && enrolled) {
              // ✅ Case 1: Student found and already enrolled in some courses
              setError(res.message)
              toast.error(res.message);
            } else if (
              studentExists && !enrolled
            ) {
              // ✅ Case 2: Student exists but not enrolled in any course
              toast.success(res.message);
              setUserData(student);
              onFinel();
            } else {
              // ✅ Case 3: New student
              toast.success(res.message);
              setUserData({ adhaarNumber : cleanAadhaar });
              onNext();
            }
          },
          onError: () => {
            setError("Error while checking enrollment status.")
            toast.error("Error", {
              description: "Failed to check enrollment status",
            });
          },
        }
      );
    } else {
      setError("Invalid Aadhaar number.")
      toast.warning("Invalid Aadhaar", {
        description: "Please enter a valid 12-digit Aadhaar number",
      });
    }
  };
  
  const instruction = [
    "Enter your 12-digit Aadhaar number to verify your identity.",
    "It will be used to check your enrollment status.",
    "If you're a new student, you can proceed with admission.",
    "If you're already enrolled in two courses, you cannot proceed.",
    "If your data exists but you're not enrolled: you will be shown your data",
    "Ensure the Aadhaar number is valid and belongs to you."
  ]

  return (
    <div className="max-w-3xl mx-auto w-full h-full p-4">
      <Card className="w-full ">
        <CardHeader >
          <CardTitle className="text-2xl">Verify Aadhaar</CardTitle>
          <CardDescription className="text-base">
            Check student enrollment using Aadhaar number
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="mb-5 space-y-0.5">
          <h1 className="text-xl font-semibold mb-1">Instruction</h1>
          {instruction.map((item, index) =>{
            return <p className=" text-muted-foreground" key={index}>{index+1}. {item}</p>
          })}
        </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="adhaar" className="text-base">
                Aadhaar Number
              </Label>
              <Input
                id="adhaar"
                placeholder="Enter 12-digit Aadhaar number"
                value={adhaarNumber}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                      
                      // Add space every 4 digits
                      if (value.length > 0) {
                        value = value.match(/.{1,4}/g)?.join(' ') || '';
                      }
                  setAdhaarNumber(value)
                }}
                maxLength={14}
                className="h-11 text-base"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </CardContent>
        <CardFooter className="w-full flex md:justify-end  ">
          <div className="grid grid-cols-2 gap-2 ">
          <Button
            variant="outline"
            onClick={() => onBack()}
          >
            Back
          </Button>
          <Button onClick={handleCheck}  >
            {isPending ? <Loader className="animate-spin" /> :
              "Verify & Continue"
            }
          </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdhaarVeificationComp;
