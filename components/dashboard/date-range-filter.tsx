import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "../ui/date-picker-with-range";

interface DateRangeFilterProps {
    currentDates: DateRange;
    onDateChange: (date: DateRange) => void;
}

export default function DateRangeFilter({ currentDates, onDateChange }: DateRangeFilterProps) {
    return (
        <section>
            < DatePickerWithRange onValueChange={onDateChange} value={currentDates} />
        </section >
    )
}