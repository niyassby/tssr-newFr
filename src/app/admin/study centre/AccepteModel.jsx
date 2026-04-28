import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function AccepteModel({isOpen, setOpen, selectedId}) {
    const [date, setDate]=useState(new Date())
    const {mutate, isPending}=useUpdateSutdyCenterRequest()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {id: selectedId, status: "accepted", date: date}
    mutate(data, {
      onSuccess: (data) => {
        if(data.success){
          toast.success(data.message)
          setOpen(false)
        }else{
          toast.error(data.message)
        }
      }
    })
  }
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Date</DialogTitle>
            <DialogDescription>
              Set a renuval date for the selected study centre.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Date</Label>
              <CustomDatePicker date={date} setDate={setDate} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>{isPending ? <Loader2 className="animate-spin"/> : "Accepte"}</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useUpdateSutdyCenterRequest } from "@/hooks/tanstackHooks/useStudyCentre"
import { toast } from "sonner"

export default function CustomDatePicker({
  date,
  setDate,
}) {
  const [open, setOpen] = React.useState(false);
  const popoverRef = React.useRef(null);

  const handleClickOutside = (e) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative w-full">
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>

      {open && (
        <div
          ref={popoverRef}
          className="absolute z-50 mt-2 bg-background border rounded-md shadow-md p-2"
        >
          

          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            fromYear={new Date().getFullYear()}
            toYear={new Date().getFullYear() + 20}
            onSelect={(val) => {
              setDate(val);
              setOpen(false);
            }}
            initialFocus
          />
        </div>
      )}
    </div>
  );
}
