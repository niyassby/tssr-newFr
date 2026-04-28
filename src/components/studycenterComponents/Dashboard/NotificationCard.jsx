import { Bell } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAllNotifications } from "@/hooks/tanstackHooks/useNotifications";
import { NotificationIcon } from "../NotificationComp/GetIcon";
import { formatDistanceToNowStrict } from "date-fns";
import Loader from "@/components/ui/loader";
import { useNavigate } from "react-router-dom";

export default function NotificationCard() {
  const { data, error, isLoading } = useAllNotifications();
  const navigate = useNavigate()
  
  if(error || isLoading) return <Loader/>
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-lg font-semibold">Recent Notifications</CardTitle>
          <CardDescription>Stay updated with your latest activities</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {data && data.data ? data?.data?.slice(0,4).map((notification) => {
          return (
            <div
              key={notification._id}
              className={`flex items-start space-x-3 p-3 rounded-lg transition-colors hover:bg-muted/50`}
            >
              <div className={`flex-shrink-0 `}>
                <NotificationIcon item={notification.category}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">{notification.title}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2 md:truncate">{notification.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{formatDistanceToNowStrict(new Date(notification.createdAt || 0), { addSuffix: true })}</p>
              </div>
            </div>
          )
        }):
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No notifications found</p>
        </div>
        }
        <div className="pt-2 border-t">
          <Button onClick={()=>navigate('notifications')} variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
