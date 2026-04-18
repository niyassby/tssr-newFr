import React from 'react';
import { useEventRecords, useUpdateEventRecords } from '@/hooks/tanstackHooks/useEvents';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Pagination from '@/components/ui/Pagination';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from 'lucide-react';
import { toast } from 'sonner';

function EventRecordTable({ eventId }) {
    const [payStatusFilter, setPayStatusFilter] = React.useState("");
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState("");
    const [limit, setLimit] = React.useState(10);
    const [debouncedSearch, setDebouncedSearch] = React.useState("");

    // Setup tanstack query hooks
    const { data: responseData, isLoading, isError } = useEventRecords(eventId, payStatusFilter, page, debouncedSearch, limit);
    const updateRecordMutation = useUpdateEventRecords();

    // Mapping API response structure securely
    const records = responseData?.data || [];
    const pagination = responseData?.pagination || { total: 0, page: 1, limit: 10, totalPages: 1 };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const handleStatusUpdate = (record, type, newValue) => {
        const payload = {
            recordId: record._id,
            payStatus: type === 'payStatus' ? newValue : record.payStatus,
            attendanceStatus: type === 'attendanceStatus' ? newValue : record.attendanceStatus,
        };
        updateRecordMutation.mutate(payload, {
            onSuccess: () => {
                toast.success("Record updated successfully");
            },
            onError: () => {
                toast.error("Failed to update record");
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Header / Actions Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-8">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Participant Records</h3>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search names, email, reg no..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1); // Reset page on new search
                            }}
                            className="pl-9 max-w-sm"
                        />
                    </div>
                    <Select value={payStatusFilter || "all"} onValueChange={(val) => { setPayStatusFilter(val === "all" ? "" : val); setPage(1); }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Payment" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table wrapper */}
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <Table className="border-b">
                    {records.length === 0 && !isLoading && !isError && (
                        <TableCaption className="mb-4 text-center pb-4 text-gray-500">No registration records found for this event.</TableCaption>
                    )}
                    <TableHeader className="bg-gray-50/50 dark:bg-zinc-900/50">
                        <TableRow>
                            <TableHead className="w-[120px]">Reg. No</TableHead>
                            <TableHead>Participant</TableHead>
                            <TableHead>Contact Info</TableHead>
                            <TableHead>Study Center</TableHead>
                            <TableHead>Registration Date</TableHead>
                            <TableHead>Attendance Status</TableHead>
                            <TableHead className="text-right">Payment Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-32">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                                        <p>Loading records...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : isError ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-red-500">
                                    Error loading participant records.
                                </TableCell>
                            </TableRow>
                        ) : (
                            records.map((record) => (
                                <TableRow key={record._id} className="group hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-medium whitespace-nowrap">
                                        {record.participantData?.regNo || 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">{record.participantData?.name}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px] truncate" title={record.participantData?.address}>
                                                {record.participantData?.address}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{record.participantData?.phoneNumber}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{record.participantData?.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-300">
                                        {record.participantData?.studyCenterName || "N/A"}
                                    </TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-300">
                                        {record.createdAt ? format(new Date(record.createdAt), 'MMM dd, yyyy') : 'N/A'}
                                        <div className="text-xs text-gray-400">{record.createdAt ? format(new Date(record.createdAt), 'h:mm a') : ''}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={record.attendanceStatus ? "true" : "false"}
                                            onValueChange={(val) => handleStatusUpdate(record, 'attendanceStatus', val === "true")}
                                            disabled={updateRecordMutation.isPending}
                                        >
                                            <SelectTrigger className={`h-8 w-[120px] text-xs font-semibold ${record.attendanceStatus
                                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                                                    : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                                                }`}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Scanned</SelectItem>
                                                <SelectItem value="false">Unscanned</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end">
                                            <Select
                                                value={record.payStatus}
                                                onValueChange={(val) => handleStatusUpdate(record, 'payStatus', val)}
                                                disabled={updateRecordMutation.isPending}
                                            >
                                                <SelectTrigger className={`h-8 w-[120px] text-[11px] font-bold uppercase tracking-wider ${record.payStatus === 'completed' || record.payStatus === 'paid' ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200" :
                                                        record.payStatus === 'pending' ? "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200" :
                                                            "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200"
                                                    }`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent align="end">
                                                    <SelectItem value="completed">COMPLETED</SelectItem>
                                                    <SelectItem value="pending">PENDING</SelectItem>
                                                    <SelectItem value="failed">FAILED</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            {/* Pagination configuration matching ui/Pagination.jsx props */}
            {records.length > 0 && pagination.totalPages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPage={pagination.totalPages}
                        totalData={pagination.total}
                        setCurrentPage={setPage}
                    />
            )}
            </div>

        </div>
    );
}

export default EventRecordTable;