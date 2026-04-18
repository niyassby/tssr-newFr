import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEventData } from '@/hooks/tanstackHooks/useEvents';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  MapPin,
  IndianRupee,
  ArrowLeft,
  Wallet,
  CheckCircle,
  XCircle,
  Clock3,
  UserCheck,
  UserX,
  CreditCard,
  Ticket,
  Download
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EventRecordTable from './EventRecordTable';
import { DownloadRecord } from './DownloadRecord';

function ViewEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: responseData, isLoading, isError } = useEventData(id);

  // Provide default empty objects for safe access if data structure is flexible
  const eventDetails = responseData?.eventDetails || responseData?.data?.eventDetails;
  const dashboardData = responseData?.dashboardData || responseData?.data?.dashboardData;

  const handleDownload = () => {
    console.log("Download");
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-gray-50/30 dark:bg-zinc-950 min-h-screen">
        <div className="flex items-center space-x-4 mb-8">
          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"></div>)}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
          <div className="xl:col-span-4 h-[500px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"></div>
          <div className="xl:col-span-8 h-[500px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (isError || !eventDetails) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
        <XCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Event Not Found</h3>
        <p className="text-gray-500 mt-2">Could not retrieve the event details or dashboard metrics.</p>
        <Button onClick={() => navigate(-1)} variant="outline" className="mt-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6  min-h-screen">

      {/* 1. Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="shadow-sm border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {eventDetails.eventName}
              </h1>
              <Badge variant={eventDetails.isActive ? "default" : "secondary"} className={eventDetails.isActive ? "bg-emerald-500 hover:bg-emerald-600 text-white font-medium" : "text-gray-500 font-medium"}>
                {eventDetails.isActive ? "Active" : "Archived"}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize font-medium">
              {eventDetails.participantType} Participants • Event Dashboard
            </p>
          </div>
        </div>
        <DownloadRecord eventId={id} />
      </div>

      {/* 2. Top Level KPIs (4-Col Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <Card className="border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Wallet className="w-16 h-16 text-indigo-600" />
          </div>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2 text-indigo-600 dark:text-indigo-400">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg">
                <IndianRupee className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold tracking-wide">Total Revenue</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 relative z-10">
              ₹{dashboardData?.totalPaymentReceived || 0}
            </h2>
          </CardContent>
        </Card>

        {/* Total Registrations */}
        <Card className="border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Ticket className="w-16 h-16 text-emerald-600" />
          </div>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2 text-emerald-600 dark:text-emerald-400">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/40 rounded-lg">
                <CheckCircle className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold tracking-wide">Completed Payments</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 relative z-10">
              {dashboardData?.completedPayments || 0} <span className="text-base font-normal text-gray-500">Txns</span>
            </h2>
          </CardContent>
        </Card>

        {/* Pending & Failed */}
        <Card className="border-gray-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-5 flex flex-col justify-center h-full">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Payments</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{dashboardData?.pendingPayments || 0}</span>
            </div>
            <Separator className="my-3 bg-gray-100 dark:bg-zinc-800" />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed Payments</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{dashboardData?.failedPayments || 0}</span>
            </div>
          </CardContent>
        </Card>

        {/* Turnout Overview */}
        <Card className="border-gray-200 dark:border-zinc-800 shadow-sm">
          <CardContent className="p-5 flex flex-col justify-center h-full">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Scanned / Present</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{dashboardData?.scannedAttendees || 0}</span>
            </div>
            <Separator className="my-3 bg-gray-100 dark:bg-zinc-800" />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Unscanned / Absent</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{dashboardData?.unscannedAttendees || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Main Dashboard Layout Split */}
      <div className=" gap-6">

        {/* Left Col: Event Information */}
        {/* <div className="xl:col-span-4 flex flex-col space-y-6">
          <Card className="shadow-sm border-gray-200 dark:border-zinc-800 flex-1">
            <CardHeader className="bg-white dark:bg-zinc-900 rounded-t-xl pb-4 border-b border-gray-100 dark:border-zinc-800/60">
              <CardTitle className="text-lg">Event Profile</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 px-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-2">Program Overview</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-gray-100 dark:border-zinc-800">
                    {eventDetails.eventProgram || "No program description provided."}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-lg shrink-0 mt-0.5 border border-blue-100 dark:border-blue-900/50">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Duration</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {eventDetails.date ? format(new Date(eventDetails.date), 'MMMM dd, yyyy') : 'TBD'}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{eventDetails.durationDays} Days</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-2.5 rounded-lg shrink-0 mt-0.5 border border-orange-100 dark:border-orange-900/50">
                      <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timing</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {eventDetails.time?.from} - {eventDetails.time?.to}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-2.5 rounded-lg shrink-0 mt-0.5 border border-purple-100 dark:border-purple-900/50">
                      <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="pr-2">
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Venue Location</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1 leading-snug">
                        {eventDetails.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2.5 rounded-lg shrink-0 mt-0.5 border border-emerald-100 dark:border-emerald-900/50">
                      <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registration Cost</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {eventDetails.fee === 0 ? 'Free Entry' : `₹${eventDetails.fee} / user`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        <EventRecordTable eventId={id} />

      </div>
    </div>
  );
}

export default ViewEvent;

