"use client";

import HabitsDatePicker from "@/app/(pages)/(authed)/habits/components/habits-date-picker";
import HabitsList from "@/app/(pages)/(authed)/habits/components/habits-list";
import SearchHabits from "@/app/(pages)/(authed)/habits/components/search-habits";
import Auth from "@/components/wrapper/auth-wrapper";
import { IHabit } from "@/lib/models/Habit";
import { habitsService } from "@/services/habits/habits.client.service";
import { useEffect, useMemo, useState } from "react";


export default function HabitsPage() {
    const [habits, setHabits] = useState<IHabit[]>([]);
    const [date, setDate] = useState<Date>();
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true)

    const habitsList = useMemo(() => {
        if (!text) return habits;
        return habits.filter(h => h.description.toLowerCase().includes(text.toLowerCase()))
    }, [habits, text])

    useEffect(() => {
        setDate(new Date());
    }, [])

    useEffect(() => {
        if (!date) return;
        setLoading(true);
        habitsService.get({ from: date })
            .then(setHabits)
            .finally(() => setLoading(false))
    }, [date])

    const onAddHabit = (habit: IHabit) => {
        habitsService.add(habit)
            .then(newHabit => {
                let newHabits = [...habits, newHabit]
                setHabits(habits => [...habits, newHabit]);
                habitsService.reorder(newHabits);
            })
    }

    const onDeleteHabit = (habit: IHabit) => {
        habitsService.remove(habit._id)
            .then(() => {
                setHabits(habits => habits.filter(h => h._id !== habit._id));
            })
    }

    return (<Auth>
        <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                {date && <HabitsDatePicker disabled={loading} onDateChange={setDate} currentDate={date} />}
                <SearchHabits disabled={loading} text={text} setText={setText} />
            </div>
            {date && <HabitsList
                canDragAndDrop={!Boolean(text)}
                habits={habitsList}
                onAddHabit={onAddHabit}
                onDeleteHabit={onDeleteHabit}
                setHabits={setHabits}
                currentDate={date}
                loading={loading}
            />}
        </section>
    </Auth>
    )
}