import { AppSidebar } from "@/components/admincomp/SideBarAdmin/app-sidebar"
import { NewNotifications } from "@/components/studycenterComponents/NotificationComp/NewNotifications"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ui/theme-toggle"
import { Outlet, useLocation } from "react-router-dom"
import { formatCrumbName } from "../studycenter/PageForStudyCenter"

export default function Page() {
   
   const location = useLocation();
  const burdCrumb = location.pathname.split('/')
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 justify-between px-2 md:px-5 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger  />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink to="/admin">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                 <BreadcrumbItem>
                  <BreadcrumbPage>
                  {formatCrumbName(burdCrumb[2]  || burdCrumb[1])}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="relative space-x-2">
            <ModeToggle/>
            <NewNotifications/>
          </div>
        </header>
        <div className="max-w-[95rem] mx-auto  px-4 md:px-8 py-6 w-full h-full ">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
