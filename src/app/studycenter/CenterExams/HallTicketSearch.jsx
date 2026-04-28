import HallTicketPDF from '@/components/studycenterComponents/examComponents/hallTicketPDF'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDlHallTicket } from '@/hooks/tanstackHooks/useExam'
import { Loader2, Search, FileText, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

function HallTicketSearch() {
  const [studentData, setStudentData] = useState(null)
  const [registrationNo, setRegistrationNo] = useState('')
  const { mutate, isPending } = useDlHallTicket()

  const getStudentData = async () => {
    setStudentData(null)
    if (!registrationNo.trim()) {
      toast.error('Please enter a valid register number');
      return;
    }

    mutate({ admissionNumber: registrationNo }, {
      onSuccess: (data) => {
        if (data.success) {
          setStudentData(data.data)
          toast.success('Hall ticket retrieved successfully');
        } else {
          toast.error(data.message)
        }
      },
      onError: (error) => {
        toast.error('Something went wrong')
      }
    })
  }

  return (
    <div className='w-full max-w-4xl mx-auto p-4 md:p-6'>
      <Card className='shadow-md border-muted/60 overflow-hidden p-0 gap-0'>
        <div className='bg-primary/5 border-b border-muted/50 p-6  text-center flex flex-col items-center'>
          <div className='w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 rotate-3 shadow-sm'>
            <FileText className='w-8 h-8 text-primary -rotate-3' />
          </div>
          <CardTitle className='text-3xl font-bold tracking-tight text-foreground/90'>
            Hall Ticket Search
          </CardTitle>
          <CardDescription className='text-base md:text-lg mt-3 max-w-lg mx-auto text-muted-foreground'>
            Enter your application or register number below to find and download your examination hall ticket.
          </CardDescription>
        </div>

        <CardContent className='p-6 md:p-10 bg-background m-0'>
          <div className='max-w-2xl mx-auto space-y-8'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='relative flex-1'>
                <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/70' />
                <Input
                  onChange={(e) => setRegistrationNo(e.target.value)}
                  value={registrationNo}
                  placeholder='Enter Register Number...'
                  className='pl-11 h-14 text-base rounded-xl bg-muted/20 border-muted-foreground/20 focus-visible:ring-primary/30 transition-all'
                  onKeyDown={(e) => e.key === 'Enter' && getStudentData()}
                />
              </div>
              <Button
                onClick={getStudentData}
                className='h-14 px-8 rounded-xl text-base font-medium shadow-sm active:scale-[0.98] transition-transform'
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className='animate-spin mr-3 h-5 w-5' />
                    Searching...
                  </>
                ) : "Get Hall Ticket"}
              </Button>
            </div>

            {studentData && (
              <div className='mt-10 pt-8 border-t border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-500'>
                <div className='flex items-center gap-3 mb-6 bg-green-500/10 text-green-700 dark:text-green-400 p-4 rounded-xl border border-green-500/20'>
                  <CheckCircle2 className='w-6 h-6 shrink-0' />
                  <div>
                    <h3 className='font-semibold text-sm md:text-base'>Hall Ticket Generated Successfully</h3>
                    <p className='text-xs md:text-sm opacity-90 mt-0.5'>Your document is ready for preview and download below.</p>
                  </div>
                </div>

                <div className='bg-muted/30 p-2 md:p-6 rounded-2xl border shadow-sm ring-1 ring-inset ring-muted/50'>
                  <HallTicketPDF studentData={studentData} />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HallTicketSearch