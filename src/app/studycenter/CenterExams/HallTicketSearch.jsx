import HallTicketPDF, { HallTicket } from '@/components/studycenterComponents/examComponents/hallTicketPDF'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDlHallTicket } from '@/hooks/tanstackHooks/useExam'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

function HallTicketSearch() {
  const [studentData, setStudentData]=useState(null)
  const [registrationNo, setRegistrationNo]=useState('')
  const {mutate, isPending}=useDlHallTicket()

  const getStudentData=async()=>{
    setStudentData(null)
    mutate({admissionNumber:registrationNo}, {
      onSuccess: (data)=>{
        if(data.success){
          setStudentData(data.data)
        }else{
          toast.error(data.message)
        }
      },
      onError: (error)=>{
        toast.error('Somthing went wrong')
      }
      
    })
    
  }
  return (
    <div className='max-w-[60rem] mx-auto p-4 md:p-9 border rounded-2xl'>
        <div>
            <h1 className='text-xl font-medium'>Hall ticket search</h1>
            <p className='text-sm text-gray-500'>Search your hall ticket by using your application number</p>
        </div>
        <div className='mt-5 flex gap-2'>
            <Input onChange={e=>setRegistrationNo(e.target.value)} placeholder='Enter Register Number' />
            <Button onClick={getStudentData}>
              {isPending ? <Loader2 className='animate-spin min-w-28'/>: "Get Hall Ticket"}
            </Button>
        </div>
        {studentData && <div className='mt-5  '>
          <HallTicketPDF studentData={studentData}/>
        </div>}
        
    </div>
  )
}

export default HallTicketSearch