import { DatePicker } from "@/components/ui/date-picker";

interface HabitsDateProps {
    onDateChange: (date: Date) => void;
    currentDate: Date;
    disabled: boolean
}

export default function HabitsDatePicker({ onDateChange, currentDate, disabled }: HabitsDateProps) {
    return (
        <section className="flex items-center gap-2 px-2">
            <DatePicker disabled={disabled} onValueChange={onDateChange} value={currentDate} showTodayButton />
        </section>
    )
}