"use client";

import DateRangeFilter from "@/components/dashboard/date-range-filter";
import { Overview } from "@/components/dashboard/overview";
import { IHabit } from "@/lib/models/Habit";
import { habitsService } from "@/services/habits/habits.client.service";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export default function DashboardPage() {
    const [habits, setHabits] = useState<IHabit[]>([])
    const [loading, setLoading] = useState(true)
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const [range, setRage] = useState<DateRange>({
        from: addDays(today, -7),
        to: today,
    })

    useEffect(() => {
        setLoading(true)
        habitsService.get({
            from: range.from?.toLocaleDateString('en-US'),
            to: range.to?.toLocaleDateString('en-US'),
        })
            .then(setHabits)
            .finally(() => setLoading(false))
    }, [range])

    return (
        <section className="flex flex-col gap-4 px-2">
            <DateRangeFilter disabled={loading} currentDates={range} onDateChange={setRage} />
            <Overview loading={loading} data={habits.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())} />
        </section>
    )
}