"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { isToday } from "@/services/util.service"

interface DatePickerProps {
    onValueChange: (date: Date) => void
    value: Date;
    showTodayButton?: boolean
    disabled?: boolean;
}

export function DatePicker({ onValueChange, value, showTodayButton = false, disabled = false }: DatePickerProps) {
    const [date, setDate] = React.useState<Date>(value)

    React.useEffect(() => {
        if (date) onValueChange(date)
    }, [date])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        disabled && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newValue) => setDate(newValue || value)}
                    initialFocus
                />
                {showTodayButton && <div className="flex items-center justify-center mb-3">
                    <Button disabled={isToday(value)} onClick={() => setDate(new Date())} size="sm" variant="ghost">Go to Today</Button></div>}
            </PopoverContent>
        </Popover>
    )
}
