import ResultPdf from '@/components/studycenterComponents/examComponents/ResultPdf'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResultCheck } from '@/hooks/tanstackHooks/useResult'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'

function MarkSheet() {
    const [result, setResult]=useState(null)
    const [registrationNo, setRegistrationNo]=useState('')
    const {mutate, isPending}=useResultCheck()
    const [error, setError]=useState(null)
  
    const handleSubmit=async()=>{
      setResult(null)
      setError(null)

      if(!registrationNo){
        toast.error('Please enter register number')
        setError('Please enter register number')
        return
      }
      mutate({admissionNumber:registrationNo}, {
        onSuccess: (data)=>{
          if(data.success){
            setResult(data.data)
          }else{
            toast.error(data.message)
            setError(data.message)
          }
        },
        onError: (error)=>{
          toast.error('Somthing went wrong')
          setError("Somthing went wrong")
        }
        
      })
      
    }
    return (
      <div className='flex items-center justify-center flex-col w-full h-full'>
        <Card className='max-w-2xl w-full mx-auto'>
          <CardHeader>
            <CardTitle>Find Student Result</CardTitle>
            <CardDescription>Enter register number of student and click button</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-1 flex flex-col justify-center'>
              <Label htmlFor="admissionNumber">Register Number</Label>
              <Input id="admissionNumber" value={registrationNo} onChange={e=>setRegistrationNo(e.target.value.trim())} placeholder='Enter Register Number' />
            <p className='text-sm text-gray-500'>
            Note: The result will be displayed, and you can download it in PDF format
            </p>
            {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
              <Button className='mt-3 ' onClick={handleSubmit}>
                {isPending ? <Loader2 className='animate-spin min-w-28'/>: "Get Student Result"}
              </Button> 

            </div>
          </CardContent>
        </Card>
          {result && <div className='mt-5 py-4 rounded-md px-6 border max-w-4xl mx-auto'>
            <ResultPdf result={result}/>
          </div>}
          
      </div>
    )
  }

export default MarkSheet