import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/rangePicker";
import { useUpdateStatusOfBatch } from "@/hooks/tanstackHooks/useBatch";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CustomDialog = ({ isOpen, onClose, data, schedul}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {mutate}=useUpdateStatusOfBatch()
  const [year, setYear] = useState("");
  const [date, setDate]=useState({
    from: null,
    to: null
  })


  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // Match transition duration
    }
  }, [isOpen]);

  useEffect(()=>{
    if(schedul){
      setDate({
        from: data?.startDate,
        to: data?.endDate
      })
      setYear(data?.admissionYear)
    }
  }, [schedul, data])

  const handleUpdateStatus = (id) => {
    if(!id || !date.from || !date.to || year === ''){
        toast.error("Please select date and year" )
        return
    }
    mutate(
      { data: {date, year}, batchId: id },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast("Batch updated", {
              description: "Batch updated successfully",
            });
            setDate({
              from: null,
              to: null
            })
            onClose()
          } else {
            toast("Somthing went wrong", {
              description: data.message,
            });
          }
        },
      }
    );
  };

  const currentYear = new Date().getFullYear();
  const yearsArray = [currentYear - 1, currentYear, currentYear + 1];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Dialog container */}
      <div
        className={`relative z-10 p-4 md:p-6 border rounded-lg h-auto w-[420px] bg-background shadow-xl transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div >
          <h3 className="text-lg font-semibold text-foreground">Edit date</h3>
          <p className="text-sm text-muted-foreground">Custom date for selected batch</p>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-2">
            <h1 className="text-sm font-medium text-foreground">Select Date</h1>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
        <div className="mt-5 space-y-2">
            <h1 className="text-sm font-medium text-foreground">Select Date</h1>
            <Select onValueChange={(value) => setYear(value)}>
                <SelectTrigger className={`w-full bg-background shadow-none py-5 `}>
                  <SelectValue placeholder="Select a Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    {yearsArray.map((year) => {
                      return <SelectItem key={year} value={year}>{year}</SelectItem>;
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
        </div>
        <div className="mt-5 flex justify-end gap-2">
            <Button onClick={onClose} variant='outline'>Cancel</Button>
            <Button onClick={()=>handleUpdateStatus(data._id)} >Save change</Button>
        </div>
      </div>
    </div>
  );
};
