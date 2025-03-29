"use client";

import DateRangeFilter from "@/components/dashboard/date-range-filter";
import { Overview } from "@/components/dashboard/overview";
import { IHabit } from "@/lib/models/Habit";
import { habitsService } from "@/services/habits/habits.client.service";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

export default function DashboardPage() {
    const [habits, setHabits] = useState<IHabit[]>([])
    const [range, setRage] = useState<DateRange>({
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
    })

    useEffect(() => {
        habitsService.get(range)
            .then(setHabits)
    }, [range])

    return (
        <section className="flex flex-col gap-4 px-2">
            <DateRangeFilter currentDates={range} onDateChange={setRage} />
            <Overview data={habits.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())} />
        </section>
    )
}