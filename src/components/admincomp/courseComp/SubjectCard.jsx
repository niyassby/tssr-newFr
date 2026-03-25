"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BadgeCheck, Ban, BookText, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubjectCard({ name, code, isActive, onToggle, onEdit }) {
  const [active, setActive] = useState(isActive);

  const handleToggle = () => {
    const newState = !active;
    setActive(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <Card className=" border-primary bg-primary-foreground  shadow-none transition-shadow w-full  ">
      <CardHeader className="  px-4 border-b relative">
        <div>
          <CardTitle className="text-xl font-semibold capitalize">
            {name.toLowerCase()}
          </CardTitle>
          <CardDescription className="text-xs mt-1">
            Code: <span className="font-medium text-black">{code}</span>
          </CardDescription>
        </div>
        <div className="absolute top-3 right-4 text-muted-foreground flex items-center gap-3">
          {onEdit && (
            <Button
              onClick={onEdit}
              variant="outline"
              size="icon"
            >
              <Pencil size={16} strokeWidth={1.5} />
            </Button>
          )}
          {/* <BookText size={18} strokeWidth={1.4} /> */}
        </div>
      </CardHeader>

      <CardContent className="px-4  text-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="">
            {/* {active ? (
              <>
                <BadgeCheck className="text-green-600 w-4 h-4" />
                <span className="text-green-700 font-medium">Active</span>
              </>
            ) : (
              <>
                <Ban className="text-red-600 w-4 h-4" />
                <span className="text-red-700 font-medium">Inactive</span>
              </>
            )} */}
            <h1 className=" font-semibold">Status</h1>
            <p className="text-sm text-muted-foreground">Change status of the batch</p>
          </div>
          <div
            className="flex items-center gap-2  "
            title="Toggle subject status"
          >
            <span className="text-xs text-muted-foreground">Status</span>
            <Switch checked={active} onCheckedChange={handleToggle} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
