import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Notification03Icon } from "hugeicons-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"
import { useAllNotifications } from "@/hooks/tanstackHooks/useNotifications"
import { NotificationIcon } from "./GetIcon"
import { formatDistanceStrict } from "date-fns"
import { useNavigate } from "react-router-dom"
import { useNotificationCount } from "@/Context/authContext"

export function NewNotifications() {
    const {data, isLoading}=useAllNotifications()
    const {notificationCount}=useNotificationCount()
    // const notificationCount = 2
    const navigate = useNavigate()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size='icon' className={"relative"}>
        <Notification03Icon/>
        {notificationCount > 0 &&<div className="absolute -top-2 -right-2 ">
            <div className="text-white text-[11px] grid bg-red-500  rounded-full size-5 place-content-center animate-pulse">{notificationCount}</div>
            </div>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 md:w-80" align="end">
        <div>
        <Card className="w-full max-w-md border-none shadow-none p-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0  px-0">
        <div>
          <CardTitle className="text-lg font-semibold">Recent Notifications</CardTitle>
          <CardDescription>Stay updated with your latest activities</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 px-0 ">
        {data?.data?.slice(0, 3).map((notification) => {
          return (
            <div
              key={notification._id}
              className={`flex items-start space-x-3 py-1 rounded-lg transition-colors hover:bg-muted/50 `}
            >
              <div className={`flex-shrink-0 `}>
                <NotificationIcon item={notification.category} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">{notification.title}</p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{notification.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDistanceStrict(new Date(notification?.createdAt || 0), new Date(), {addSuffix: true})}</p>
              </div>
            </div>
          )
        })}
        <div className="pt-2 border-t">
          <Button onClick={()=>navigate('notifications')} variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </CardContent>
    </Card>
        </div>
      </PopoverContent>
    </Popover>
  )
}
