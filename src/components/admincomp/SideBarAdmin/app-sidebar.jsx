import * as React from "react"
import {
  Settings ,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import logo from "../../../assets/Logo.svg"

import { NavMain } from "@/components/admincomp/SideBarAdmin/nav-main"
import { NavProjects } from "@/components/admincomp/SideBarAdmin/nav-projects"
import { NavSecondary } from "@/components/admincomp/SideBarAdmin/nav-secondary"
import { NavUser } from "@/components/admincomp/SideBarAdmin/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Book02Icon, Bookmark03Icon, Calendar01Icon, Calendar04Icon, CheckmarkBadge02Icon, FileDownloadIcon, Folder01Icon, GraduateMaleIcon, Home04Icon, Image02Icon, InformationSquareIcon, Mortarboard02Icon, Note01Icon, NoteEditIcon, Notification03Icon, Settings02Icon, Ticket03Icon, UserAdd01Icon, UserIcon, UserMultipleIcon } from "hugeicons-react"
import { Link } from "react-router-dom"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "",
      icon: Home04Icon,
    },
    {
      title: "Study Centre",
      url: "studycentre",
      icon: Book02Icon,
      items: [
        {
          title: "Add Centre",
          url: "/admin/studycentre/add",
        },
        {
          title: "Requests",
          url: "/admin/studycentre/req",
        },
      ],
    },
    {
      title: "Academics",
      url: "academics",
      icon: Mortarboard02Icon,
      items: [
        {
        title: "Courses",
        url: "/admin/academics/course",
      },
        {
        title: "Subjects",
        url: "/admin/academics/subjects",
      },
        {
        title: "Requests",
        url: "/admin/academics/request",
      },
    ]
      
    },
    // {
    //   title: "Admission",
    //   url: "admission",
    //   icon: UserAdd01Icon,
      
    // },
    {
      title: "Students",
      url: "students",
      icon: GraduateMaleIcon,
      items:[
        {
          title: "Verification",
          url: "/admin/students/verification",
        }
      ]
      
    },
    {
      title: "Examination",
      url: "examination",
      icon: Note01Icon,
      items: [
        {
          title: "Result",
          url: "/admin/examination/result",
        },
        {
          title: "Add Result",
          url: "/admin/examination/result/upload",
        }
      ]
      
    },
    {
      title: "Staff & Faculty",
      url: "staff", 
      icon: UserIcon,
      
    },
    {
      title: "Event Manage",
      url: "event", 
      icon: Calendar01Icon,
      items: [
        {
          title: "Create Event",
          url: "/admin/event/create",
        }
      ]
    },
    {
      title: "Resources",
      url: "resources", 
      icon: Folder01Icon, 
      items: [
        {
          title: "Downloads",
          url: "/admin/resources/downloads",
        },
        {
          title: "Products",
          url: "/admin/resources/products",
        },
        {
          title: "Orders",
          url: "/admin/resources/orders",
        },
        {
          title: "Gallery",
          url: "/admin/resources/gallery",
        }
      ]
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
      name: "Notification",
      url: "notifications",
      icon: Notification03Icon,
    },
    {
      name: "Settings",
      url: "settings",
      icon: Settings02Icon,
    },
    
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar variant="inset"  {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                {/* <div>
                  <img className="w-32" src={logo} alt="" />
                </div> */}
                <div
                  className="border p-0.5 bg-white text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img className="w-full" src={logo} alt="" />
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>)
  );
}
