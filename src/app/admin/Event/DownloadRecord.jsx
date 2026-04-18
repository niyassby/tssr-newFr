import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Download, Loader2 } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { eventService } from "@/API/services/eventService";
import * as XLSX from "xlsx";
import { toast } from "sonner";

export function DownloadRecord({ eventId }) {
    const [payStatus, setPayStatus] = useState("all");
    const [attendanceStatus, setAttendanceStatus] = useState("all");
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const params = { eventId };

            if (payStatus !== "all") {
                params.payStatus = payStatus;
            }

            if (attendanceStatus !== "all") {
                params.attendanceStatus = attendanceStatus;
            }

            const response = await eventService.downloadEventRecords(params);

            if (!response || response?.data?.length === 0) {
                toast.error("No records found for the selected filters.");
                setIsDownloading(false);
                return;
            }

            const data = response?.data?.map((item) => {
                return {
                    ...item,
                   payStatus: item.payStatus,
                    attendanceStatus: item.attendanceStatus ? "Attended" : "Not Attended",
                }
            })

            // Convert response data to Excel format
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Event Records");

            XLSX.writeFile(workbook, `Event_Records_${eventId}.xlsx`);
            toast.success("Downloaded successfully!");
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Failed to download records. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>Download <Download className="ml-2 h-4 w-4" /></Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Download Records</h4>
                        <p className="text-sm text-muted-foreground">
                            Select the filters you want to include in the download.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label>Payment Status</Label>
                            <Select value={payStatus} onValueChange={setPayStatus}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="failed">Failed</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label>Attendance</Label>
                            <Select value={attendanceStatus} onValueChange={setAttendanceStatus}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="true">Attended</SelectItem>
                                        <SelectItem value="false">Not Attended</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-6 w-full">
                    <Button className="w-full" onClick={handleDownload} disabled={isDownloading}>
                        {isDownloading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Downloading...
                            </>
                        ) : (
                            "Download Excel"
                        )}
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
