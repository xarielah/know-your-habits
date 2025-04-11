import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";

interface DateRangeFilterProps {
    currentDates: DateRange;
    onDateChange: (date: DateRange) => void;
    disabled: boolean
}

export default function DateRangeFilter({ currentDates, onDateChange, disabled }: DateRangeFilterProps) {
    return (
        <section className="dashboards-filter">
            <DatePickerWithRange disabled={disabled} onValueChange={onDateChange} value={currentDates} />
        </section >
    )
}