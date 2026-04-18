import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/datePicker"
import { TimePicker } from "@/components/ui/timePicker"
import { Switch } from "@/components/ui/switch"
import { useUpdateEvents } from '@/hooks/tanstackHooks/useEvents'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
    eventName: z.string().min(2, { message: "Event Name must be at least 2 characters." }),
    eventProgram: z.string().min(1, { message: "Event Program is required." }),
    location: z.string().min(1, { message: "Location is required." }),
    date: z.date({
        required_error: "A date is required.",
    }),
    time: z.object({
        from: z.string().optional(),
        to: z.string().optional(),
    }),
    durationDays: z.coerce.number().min(1, { message: "Duration must be at least 1 day." }),
    isActive: z.boolean().default(true),
    fee: z.coerce.number().min(0, { message: "Fee must be a valid positive number." }),
    password: z.string().min(4, { message: "Password must be at least 4 characters." }),
    // participantType: z.string().min(1, { message: "Select at least one participant type." })
})

export function EditEventModal({ event, isOpen, onClose }) {
    const { mutate, isPending } = useUpdateEvents()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventName: "",
            eventProgram: "",
            location: "",
            time: { from: "", to: "" },
            durationDays: 1,
            isActive: true,
            fee: 0,
            password: "",
            participantType: ""
        },
    })

    useEffect(() => {
        if (event && isOpen) {
            form.reset({
                eventName: event.eventName || "",
                eventProgram: event.eventProgram || "",
                location: event.location || "",
                date: event.date ? new Date(event.date) : undefined,
                time: event.time || { from: "", to: "" },
                durationDays: event.durationDays || 1,
                isActive: event.isActive !== undefined ? event.isActive : true,
                fee: event.fee || 0,
                password: event.password || "",
                participantType: event.participantType || ""
            })
        }
    }, [event, isOpen, form])

    function onSubmit(values) {
        if (!event?._id) return

        mutate({ data: values, id: event._id }, {
            onSuccess: () => {
                toast.success("Event updated successfully")
                form.reset()
                onClose()
            },
            onError: (error) => {
                toast.error(error?.message || "Failed to update event")
            }
        })
    }

    const handleTimeChange = (updater, currentFormValue, onChange) => {
        const prevStruct = currentFormValue || { from: "", to: "" };
        const newStruct = typeof updater === 'function' ? updater(prevStruct) : updater;
        onChange(newStruct);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-300">
            <div className="max-w-xl w-full max-h-[90vh] overflow-y-auto bg-white p-6 rounded-lg">
                <div>
                    <h1 className="text-xl font-medium">Edit Event</h1>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Event Name */}
                            <FormField
                                control={form.control}
                                name="eventName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter event name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Event Program */}
                            <FormField
                                control={form.control}
                                name="eventProgram"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Program</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter event program" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Location */}
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Date */}
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col pt-2 pb-1.5 justify-end">
                                        <FormLabel className="mb-1">Date</FormLabel>
                                        <DatePicker
                                            date={field.value}
                                            setDate={field.onChange}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Duration Days */}
                            <FormField
                                control={form.control}
                                name="durationDays"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration (Days)</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="1" placeholder="1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Fee */}
                            <FormField
                                control={form.control}
                                name="fee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fee</FormLabel>
                                        <FormControl>
                                            <Input type="number" min="0" placeholder="Enter fee amount" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Set a password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Participant Type */}
                            <FormField
                                control={form.control}
                                name="participantType"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Participant Type</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger disabled={true} className="w-full">
                                                    <SelectValue placeholder="Select participant types" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="student">Student</SelectItem>
                                                        <SelectItem value="others">Others</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Time From and To */}
                            <FormField
                                control={form.control}
                                name="time"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col col-span-1 md:col-span-2">
                                        <FormLabel>Time (From - To)</FormLabel>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <TimePicker
                                                type="from"
                                                time={field.value?.from}
                                                setTime={(updater) => handleTimeChange(updater, field.value, field.onChange)}
                                                label="From"
                                            />
                                            <TimePicker
                                                type="to"
                                                time={field.value?.to}
                                                setTime={(updater) => handleTimeChange(updater, field.value, field.onChange)}
                                                label="To"
                                            />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Is Active */}
                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 col-span-1 md:col-span-2">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">
                                                Active Status
                                            </FormLabel>
                                            <FormDescription>
                                                Turn on to make the event active publicly.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end pt-4 gap-3">
                            <Button type="button" variant="outline" onClick={onClose} className="w-full md:w-auto">
                                Cancel
                            </Button>
                            <Button type="submit" className="w-full md:w-auto">
                                {isPending ? "Updating..." : "Update Event"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
