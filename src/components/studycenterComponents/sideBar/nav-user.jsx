"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  File,
  LogOut,
  Moon,
  Settings,
  Sparkles,
  Sun,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/Context/authContext"
import { authService } from "@/API/services/authService"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/Context/theme-provider"

export function NavUser() {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const {user, setUser}=useAuth()
  const {theme, setTheme}=useTheme()

  const handleLogOut = async () => { 
    
    await authService.logOut()
    setUser(null);
    
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg border">
                <AvatarImage src={user?.studycenterId?.logo} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-muted border">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.studycenterId?.logo} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-muted">{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={()=>navigate('/studycenter/settings')}>
                <Settings />
                Settings
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={()=>navigate('/studycenter/notifications')}>
                <Bell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setTheme(theme==='dark'?'light':'dark')}>
                              {theme==='dark'?<Sun />:<Moon />}
                              Toggle Theme
                            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
