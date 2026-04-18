import React, { useEffect, useState } from 'react'
import { ArrowLeft, Calendar, Clock, MapPin, User, BookOpen, Hash, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useDlHallTicket } from '@/hooks/tanstackHooks/useExam'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { formatDate } from 'date-fns'
import Loader from '@/components/ui/loader'

function HTverification() {
  // const admissionNumber = 333
  const {id}=useParams()
  const [studentData, setData] = useState({})
  const [isError, setError] = useState(null)
  const {mutate, isPending, error}=useDlHallTicket()

    const instructions = [
      "Bring your hall ticket and ID card",
      "No electronic devices allowed",
      "Arrive 30 minutes before exam time",
      "Use only blue/black pen",
    ]

    useEffect(()=>{
      mutate({admissionNumber:id}, {
        onSuccess: (data) => {
          if(data.success){
            setData(data.data)
            toast.success("Hall Ticket verified successfully")
          }else{
            toast.error(data.message)
            setError(data.message)
          }
        }
      })
      
    }, [id])

    if(isPending)return <div className='w-full h-screen'><Loader/></div>
    if(error)return <div className='w-full h-screen text-center flex items-center justify-center text-2xl text-red-500'>Somthing went wrong</div>
    if(isError)return <div className='w-full h-screen text-center flex items-center justify-center text-xl font-medium text-red-500'>{isError}</div>
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
      <div className=" p-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Student Information Card */}
        <Card className='shadow-non'>
          <CardHeader>
            <CardAction>
            <CheckCircle size={20} className="text-green-600" />
            </CardAction>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-40 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={studentData?.profileImage || "https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGVudCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
                    alt={` Photo`}
                    className="w-full h-full object-cover"
                    
                  />
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-xl font-semibold">{studentData?.studentName}</h3>
                  <p className="text-muted-foreground">{studentData?.courseName}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium">Registration:</span>
                    <p>{studentData?.registrationNo}</p>
                  </div>
                  <div>
                    <span className="font-medium">Aadhaar No:</span>
                    <p>{studentData?.adhaarNumber?.replace(/\d(?=\d{4})/g, 'X') || "-"}</p>
                  </div>
                  <div>
                    <span className="font-medium">Study Centre:</span>
                    <p>{studentData?.studyCenter}</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="">{studentData?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Examination Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{studentData?.examName}</h3>
              {/* <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{}</Badge>
                <Badge variant="outline">{} Marks</Badge>
              </div> */}
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{studentData?.courseName}</p>
                    <p className="text-sm text-muted-foreground">Code: {studentData?.courseCode}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {formatDate(new Date(studentData?.examDate?.from || new Date()), "MMM/dd/yyyy")} -{" "}
                      {formatDate(new Date(studentData?.examDate?.to || new Date()), "MMM/dd/yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground">{studentData?.examTime?.from} - {studentData?.examTime?.to}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{studentData?.examCenter}</p>
                    <p className="text-sm text-muted-foreground">@ Exam hall</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">{studentData?.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Important Instructions:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-xs mt-1">•</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        
      </div>
    </div>
    </div>
  )
}

export default HTverification
