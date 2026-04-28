
import * as React from "react";
import {
  LifeBuoy,
  Send,
} from "lucide-react";
import logo from "../../../assets/Logo.svg";

import {
  Award04Icon,
  FileDownloadIcon,
  Home04Icon,
  Mortarboard02Icon,
  Notification03Icon,
  PenTool03Icon,
  Settings02Icon,
  Store02Icon,
  UserAdd01Icon,
} from "hugeicons-react";
import { NavMain } from "@/components/studycenterComponents/sideBar/nav-main";
import { NavProjects } from "@/components/studycenterComponents/sideBar/nav-projects";
import { NavUser } from "@/components/studycenterComponents/sideBar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "",
      icon: Home04Icon,
    },
    {
      title: "Students",
      url: "students",
      icon: Mortarboard02Icon,
      items:[
        {
          title: "Verification",
          url: "/studycenter/students/verification",
        }
      ]
    },
    {
      title: "Admission",
      url: "/studycenter/admission",
      icon: UserAdd01Icon,
    },

    {
      title: "Examination",
      url: "examination",
      icon: PenTool03Icon,
      items:[
        {
          title: "Hall Ticket",
          url: "/studycenter/examination/hallticket",
        },
        {
          title: "Mark List",
          url: "/studycenter/examination/marklist",
        },
      ]
    },
    {
      title: "Courses",
      url: "courses",
      icon: Award04Icon,
    }, 
    {
      title: "Downloads",
      url: "downloads",
      icon: FileDownloadIcon,
    },
    {
      title: "TSSR Store",
      url: "store",
      icon: Store02Icon,
      items: [
        {
          title: "TSSR Store",
          url: "store/myorders",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Settings",
      url: "settings",
      icon: Settings02Icon,
    },
    {
      name: "Notifications",
      url: "notifications",
      icon: Notification03Icon,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="border bg-white p-0.5 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img
                    className="w-full"
                    src={logo}
                    alt="StudyCenterLogo"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">TSSR </span>
                  <span className="truncate text-xs">Council</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
