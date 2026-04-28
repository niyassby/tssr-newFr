import AccountSettings from '@/components/admincomp/SettingsComp/AccountSettings'
import GenarelSettings from '@/components/admincomp/SettingsComp/GenarelSettings'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'

const tabs = ['Access Management', 'Account Information']
const items = [<GenarelSettings/>, <AccountSettings/>, ]

function AdminSettings() {
    const [index, setIndex] = useState(0)
  return (
    <div className='w-full h-full max-w-[75rem]'>
        <Card className='w-full h-full shadow-none '>
            <CardHeader className=''>
                <CardTitle className='text-2xl'>Settings</CardTitle>
                <CardDescription>Manage your account and study center preferences.</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className='w-full h-full '>
                <div className='md:grid w-full h-full md:grid-cols-10 gap-2'>
                    <div className='md:col-span-2 w-full'>
                        {tabs.map((item, i)=>{
                            return <div onClick={()=>setIndex(i)} key={i} className={`${index === i ? 'bg-muted' : ''} w-full py-2 px-4 text-sm font-medium rounded-md hover:bg-muted cursor-pointer`}>{item}</div>
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

export default AdminSettings