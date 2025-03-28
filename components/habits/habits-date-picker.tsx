import { cn } from "@/lib/utils";
import { isToday } from "date-fns";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/datepicker";

interface HabitsDateProps {
    onDateChange: (date: Date) => void;
    currentDate: Date;
}

export default function HabitsDatePicker({ onDateChange, currentDate }: HabitsDateProps) {
    return (
        <section className="flex items-center gap-2">
            <DatePicker onValueChange={onDateChange} value={currentDate} />
            <Button className={cn(isToday(currentDate) && "hidden")} onClick={() => onDateChange(new Date())}>Go To Today</Button>
        </section>
    )
}