import CentreDetails from '@/components/studycenterComponents/Dashboard/CentreDetails'
import DashbordCard from '@/components/studycenterComponents/Dashboard/DashbordCard'
import NotificationCard from '@/components/studycenterComponents/Dashboard/NotificationCard'
import React from 'react'
import logo from "../../../assets/Logo.svg";
import { useDashboardDataOfCenter } from '@/hooks/tanstackHooks/useNotifications';
import Loader from '@/components/ui/loader';
import { useAuth } from '@/Context/authContext';
import { Building2 } from 'lucide-react';

function DashbordStudy() {
  const { data, error, isError, isLoading } = useDashboardDataOfCenter()
  const { user } = useAuth()

  if (error || isError) return <div>Error</div>
  if (isLoading) return <div className='w-full h-[80vh] flex items-center justify-center'><Loader /></div>

  return (
    <div className='w-full space-y-6 md:space-y-8 pb-10'>
      {/* Header Banner */}
      <div className='relative overflow-hidden rounded-3xl bg-white dark:bg-card border shadow-sm p-6 md:p-10'>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-50 dark:bg-blue-900/10 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-40 w-48 h-48 rounded-full bg-indigo-50 dark:bg-indigo-900/10 blur-3xl opacity-50 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="flex gap-4 md:gap-6 items-center">
            <div className="p-3 bg-blue-50 dark:bg-[#1e293b] rounded-2xl hidden md:flex items-center justify-center min-w-20 min-h-20">
              <img src={logo} className="w-16 md:w-20 object-contain drop-shadow-sm" alt="TSSR Logo" />
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <div className="flex items-center gap-3 md:hidden mb-2">
                <img src={logo} className="w-12 object-contain" alt="TSSR Logo" />
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100/80 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wide uppercase mb-1 md:mb-2">
                Study Center Dashboard
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                TSSR Council
              </h1>
              <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                तकनीकी अध्ययन और कौशल अनुसंधान परिषद
              </p>
            </div>
          </div>

          {user?.studycenterId && (
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 w-full xl:w-auto">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-white dark:bg-slate-800 border shadow-sm flex items-center justify-center overflow-hidden">
                {user?.studycenterId?.logo ? (
                  <img src={user?.studycenterId?.logo} className="w-full h-full object-cover" alt="Center Logo" />
                ) : (
                  <Building2 className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-0.5">Welcome Back,</p>
                <h2 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 truncate pr-4">
                  {user?.studycenterId?.name || "Center Admin"}
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>

      <DashbordCard data={data?.data} />

      <div className='grid lg:grid-cols-10 gap-6 md:gap-8'>
        <div className='lg:col-span-7 flex flex-col h-full'>
          <CentreDetails />
        </div>
        <div className='lg:col-span-3 flex flex-col h-full'>
          <NotificationCard />
        </div>
      </div>
    </div>
  )
}

export default DashbordStudy