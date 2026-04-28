import { CreateNotification } from '@/components/admincomp/NotificationComp/CreateNotification'
import AllNotification from '@/components/studycenterComponents/NotificationComp/AllNotification'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminNotifications() {
  const navigate = useNavigate('')
  const manageNotificationNav = () => {
    navigate("/admin/notifications/manage");
  }
  return (
    <div className="w-full max-w-[65rem] mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold ">Notifications</h1>
        <div onClick={manageNotificationNav}>
          <Button>Manage Notifications</Button>
        </div>
      </div>
      {/* <div className='mb-10'>
            <CreateNotification/>
        </div> */}
      <AllNotification />
    </div>
  );
}

export default AdminNotifications