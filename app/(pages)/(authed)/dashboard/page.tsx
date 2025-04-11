"use client";

import DateRangeFilter from "@/app/(pages)/(authed)/dashboard/components/date-range-filter";
import "@/app/(pages)/(authed)/dashboard/style/dashboard-page.css";
import Auth from "@/components/wrapper/auth-wrapper";
import { IHabit } from "@/lib/models/Habit";
import { habitsService } from "@/services/habits/habits.client.service";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { HabitsBarChart } from "./components/habits-bar-chart";

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

    return (<Auth>
        <section className="dashboards-page px-2">
            <DateRangeFilter disabled={loading} currentDates={range} onDateChange={setRage} />
            {/* <Overview loading={loading} data={overviewData} /> */}
            <HabitsBarChart loading={loading} habits={habits} />
        </section>
    </Auth>
    )
}