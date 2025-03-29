"use client";
import HabitsDatePicker from "@/components/habits/habits-date-picker";
import HabitsList from "@/components/habits/habits-list";
import SearchHabits from "@/components/habits/search-habits";
import { IHabit } from "@/lib/models/Habit";
import { habitsService } from "@/services/habits/habits.client.service";
import { useEffect, useMemo, useState } from "react";

const demoHabits = [
    {
        _id: '1',
        description: "Waking up early",
        type: "positive",
        timeOfDay: "morning",
        createdAt: new Date().toISOString()
    },
    {
        _id: '2',
        description: "Drinking coffee",
        type: "neutral",
        timeOfDay: "morning",
        createdAt: new Date().toISOString()
    },
    {
        _id: '3',
        description: "Reading newspaper",
        type: "positive",
        timeOfDay: "morning",
        createdAt: new Date().toISOString()
    },
    {
        _id: '4',
        description: "Skipping breakfast",
        type: "negative",
        timeOfDay: "morning",
        createdAt: new Date().toISOString()
    },
    {
        _id: '5',
        description: "Procrastinating",
        type: "negative",
        timeOfDay: "afternoon",
        createdAt: new Date().toISOString()
    },
    {
        _id: '6',
        description: "Evening walk",
        type: "positive",
        timeOfDay: "evening",
        createdAt: new Date().toISOString()
    },
    {
        _id: '7',
        description: "Late-night snacking",
        type: "negative",
        timeOfDay: "latenight",
        createdAt: new Date().toISOString()
    }
];

const demoHabitsList = {
    userId: 'user101',
    habits: demoHabits
}

export default function HabitsPage() {
    const [habits, setHabits] = useState<IHabit[]>([]);
    const [date, setDate] = useState<Date>();
    const [text, setText] = useState<string>("");

    const habitsList = useMemo(() => {
        if (!text) return habits;
        return habits.filter(h => h.description.toLowerCase().includes(text.toLowerCase()))
    }, [habits, text])

    useEffect(() => {
        setDate(new Date());
    }, [])

    useEffect(() => {
        if (!date) return;
        habitsService.get({ from: date })
            .then(setHabits)
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

    return (
        <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                {date && <HabitsDatePicker onDateChange={setDate} currentDate={date} />}
                <SearchHabits text={text} setText={setText} />
            </div>
            {date && <HabitsList
                canDragAndDrop={!Boolean(text)}
                habits={habitsList}
                onAddHabit={onAddHabit}
                onDeleteHabit={onDeleteHabit}
                setHabits={setHabits}
                currentDate={date}
            />}
        </section>
    )
}