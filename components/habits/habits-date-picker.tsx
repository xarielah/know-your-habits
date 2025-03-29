import { DatePicker } from "../ui/date-picker";

interface HabitsDateProps {
    onDateChange: (date: Date) => void;
    currentDate: Date;
}

export default function HabitsDatePicker({ onDateChange, currentDate }: HabitsDateProps) {
    return (
        <section className="flex items-center gap-2 px-2">
            <DatePicker onValueChange={onDateChange} value={currentDate} showTodayButton />
        </section>
    )
}