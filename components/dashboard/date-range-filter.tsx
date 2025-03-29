import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "../ui/date-picker-with-range";

interface DateRangeFilterProps {
    currentDates: DateRange;
    onDateChange: (date: DateRange) => void;
    disabled: boolean
}

export default function DateRangeFilter({ currentDates, onDateChange, disabled }: DateRangeFilterProps) {
    return (
        <section>
            <DatePickerWithRange disabled={disabled} onValueChange={onDateChange} value={currentDates} />
        </section >
    )
}