import AccountSettings from '@/components/admincomp/SettingsComp/AccountSettings'
import CenterDetailsEdit from '@/components/studycenterComponents/SettingsCompCenter/EditCenterDetails'
import NotAccess from '@/components/ui/NotAccess'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useSettings } from '@/hooks/tanstackHooks/useAuth'
import React, { useState } from 'react'

const tabs = ['Account Information', 'Center Details']

function SettingsCentre() {
    const [index, setIndex] = useState(0) 
    const {data}=useSettings()
    const comp = data?.data?.studyCenterUpdatePermission ? <CenterDetailsEdit/> : <NotAccess/>
    const items = [ <AccountSettings/>, comp ]
  return (
    <div className='w-full h-full max-w-[75rem]'>
        <Card className='w-full h-full shadow-none border-none'>
            <CardHeader className=''>
                <CardTitle className='text-2xl'>Settings</CardTitle>
                <CardDescription>Manage your account and study center preferences.</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className='w-full h-full '>
                <div className='md:grid w-full h-full md:grid-cols-10 gap-2'>
                    <div className='md:col-span-2 w-full space-y-0.5 flex md:flex-col items-center j ustify-center'>
                        {tabs.map((item, i)=>{
                            return <div onClick={()=>setIndex(i)} key={i} className={`${index === i ? 'bg-muted hover:bg-muted/95 ' : 'hover:bg-muted/95'} w-full py-2 px-2 md:px-4 text-sm font-medium rounded-md  cursor-pointer`}>{item}</div>
                        })}
                    </div>
                    <div className=' md:col-span-8 w-full h-full'>
                       {items[index]}
                       
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default SettingsCentre

