import { useAllEvents, useDeleteEvents } from '@/hooks/tanstackHooks/useEvents'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Copy, Edit, Eye, Trash } from "lucide-react"
import { EditEventModal } from './EditEventModal'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Alert } from '@/components/ui/Alert'
import { toast } from 'sonner'

function Events() {
  const [editingEvent, setEditingEvent] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [copied, setCopied] = useState(false)

  const { data, isLoading, error } = useAllEvents(debouncedSearch)
  const {mutate:deleteEvent,isPending:isDeleting} = useDeleteEvents()
  const eventsList = Array.isArray(data) ? data : data?.events || data?.data || []

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  const deleteFn = () => {
    deleteEvent(deleteId, {
      onSuccess: () => {
        toast.success("Event deleted successfully")
        setDeleteId(null)
      },
      onError: () => {
        toast.error("Failed to delete event")
      }
    })
    setDeleteId(null)
  }

  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // Modern API (PC, mobile, secure context)
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers / insecure contexts
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed"; // avoid scrolling to bottom
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading events...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading events: {error.message}</div>
  }

  return (
    <div className="p-3 md:p-6  space-y-6">
      {copied && (
        <div className="fixed bottom-4 left-1/2 bg-black/70 text-sm text-white px-4 py-2 rounded-xl animate-in fade-in zoom-in-95">
          Link copied to clipboard!
        </div>
      )}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Events</h2>
          <p className="text-muted-foreground">Manage your scheduled events here.</p>
        </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
          <Input onChange={(e)=>setSearch(e.target.value)} value={search} placeholder="Search events" className="w-full max-w-sm" />
        <Button onClick={() => navigate("/admin/event/create")} >
          Create Event
        </Button>
      </div>

      <div className="rounded-xl border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No events found.
                </TableCell>
              </TableRow>
            ) : (
              eventsList.map((event) => (
                <TableRow  key={event._id}>
                  <TableCell className="font-medium">{event.eventName}</TableCell>
                  <TableCell>{event.eventProgram}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {event.date && <span>{format(new Date(event.date), "PPP")}</span>}
                      {event.time && (
                        <span className="text-xs text-muted-foreground">
                          {event.time.from} - {event.time.to}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{event.durationDays} Days</TableCell>
                  <TableCell>{event.fee}</TableCell>
                  <TableCell className="capitalize">{event.participantType}</TableCell>
                  <TableCell>
                    {event.isActive ? (
                      <Badge variant="default" className="bg-green-600 hover:bg-green-700">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => copyToClipboard(`https://tssrcouncil.com/#/event-verification/event/${event._id}`)} variant="outline" size="icon" className="h-8 w-8 ">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => navigate(`/admin/event/${event._id}`)} variant="outline" size="icon" className="h-8 w-8 ">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => setEditingEvent(event)} variant="outline" size="icon" className="h-8 w-8 text-blue-600 border-blue-200 hover:text-blue-700 hover:bg-blue-50">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => {setDeleteId(event._id); setIsOpen(true)}} variant="outline" size="icon" className="h-8 w-8 text-red-600 border-red-200 hover:text-red-700 hover:bg-red-50">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {deleteId && (
        <Alert
         deleteFn={deleteFn}
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         discription={"Are you sure you want to delete this event?"}
         Head={"Delete Event"}
        />
      )}

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          isOpen={!!editingEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </div>
  )
}

export default Events