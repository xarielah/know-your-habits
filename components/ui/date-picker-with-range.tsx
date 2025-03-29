"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerWithRangeProps {
    onValueChange: (date: DateRange) => void
    value: DateRange;
    disabled?: boolean;
}

export function DatePickerWithRange({
    className,
    onValueChange,
    value,
    disabled = false
}: React.HTMLAttributes<HTMLDivElement> & DatePickerWithRangeProps) {
    const [date, setDate] = React.useState<DateRange | undefined>(value)

    const handlePopoverChange = (open: boolean) => {
        if (!open) {
            if (date?.from && date?.to) {
                date.from.setHours(0, 0, 0, 0);
                date.to.setHours(23, 59, 59, 999);
                onValueChange(date)
            } else {
                setDate(value)
            }
        }
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover onOpenChange={handlePopoverChange}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                            disabled && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        disabled={disabled}
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
