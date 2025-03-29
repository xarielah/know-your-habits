import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "../ui/date-picker-with-range";

interface DateRangeFilterProps {
    currentDates: DateRange;
    onDateChange: (date: DateRange) => void;
}

export default function DateRangeFilter({ currentDates, onDateChange }: DateRangeFilterProps) {
    return (
        <section className="flex items-center gap-2 px-2">
            <DatePickerWithRange onValueChange={onDateChange} value={currentDates} />
        </section>
    )
}