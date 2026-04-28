import { AdminChart } from "@/components/admincomp/AdminDashbord/AdminChart";
import DataCard from "@/components/admincomp/AdminDashbord/DataCard";
import React from "react";
import NotificationCard from "@/components/studycenterComponents/Dashboard/NotificationCard";
import { useDashboardData } from "@/hooks/tanstackHooks/useNotifications";
import Loader from "@/components/ui/loader";
import { format } from "date-fns";
import { LayoutDashboard, Sparkles } from "lucide-react";

function Dashbord() {
  const { data, isLoading, isError, error } = useDashboardData();

  if (error || isError) return <div className="p-8 text-destructive">Error loading dashboard data</div>;
  if (isLoading) return <div className="w-full h-screen flex items-center justify-center"><Loader /></div>;

  return (
    <div className="w-full min-h-[calc(100vh-100px)] lg:p-8 space-y-8 bg-background">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-10 sm:px-10 shadow-lg text-primary-foreground">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-zinc-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-zinc-100/5 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-medium mb-4 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Welcome to TSSR Council
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Admin Dashboard
            </h1>
           
          </div>

          <div className="hidden md:flex flex-col items-end">
            <div className="text-right">
              <p className="text-sm font-medium text-primary-foreground/70 uppercase tracking-widest mb-1">Today</p>
              <h3 className="text-2xl md:text-4xl font-bold">{format(new Date(), "dd, EEEE")}</h3>
              <h3 className="text-xl font-semibold">{format(new Date(), "MMMM, yyyy")}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {/* KPI Cards section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Overview</h2>
          </div>
          <DataCard data={data?.data} />
        </div>

        {/* Charts & Notifications Grid */}
        <div className="grid lg:grid-cols-8 gap-8">
          <div className="lg:col-span-5 flex flex-col h-full space-y-4">
            {/* <h2 className="text-xl font-semibold pl-1">Enrollment Analytics</h2> */}
            <div className="flex-1 rounded-2xl  ">
              <AdminChart data={data?.data?.chart} />
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col h-full space-y-4">
            {/* <h2 className="text-xl font-semibold pl-1">Recent Updates</h2> */}
            <div className="flex-1 rounded-2xl   relative">
              <NotificationCard />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashbord;
