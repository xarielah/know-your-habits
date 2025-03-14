"use client";
import HabitsList from "@/components/habits/habits-list";
import { useState } from "react";

const demoHabits = [
    {
        habit: "Waking up early",
        type: "positive",
        timeOfDay: "morning",
        createdAt: new Date().toISOString()
    },
    {
        habit: "Drinking coffee",
        type: "neutral",
        timeOfDay: "morning",
        createdAt: new Date().toISOString()
    },
    {
        habit: "Reading newspaper",
        type: "positive",
        timeOfDay: "morning",
        createdAt: new Date().toISOString()
    },
    {
        habit: "Skipping breakfast",
        type: "negative",
        timeOfDay: "morning",
        createdAt: new Date().toISOString()
    },
    {
        habit: "Procrastinating",
        type: "negative",
        timeOfDay: "afternoon",
        createdAt: new Date().toISOString()
    },
    {
        habit: "Evening walk",
        type: "positive",
        timeOfDay: "evening",
        createdAt: new Date().toISOString()
    },
    {
        habit: "Late-night snacking",
        type: "negative",
        timeOfDay: "latenight",
        createdAt: new Date().toISOString()
    }
];

export default function HabitsPage() {
    const [habits, setHabits] = useState(demoHabits);

    const onAddHabit = (habit: any) => {
        setHabits([...habits, habit]);
    }

    const onDeleteHabit = (habit: any) => {
        setHabits(habits.filter(h => h.habit !== habit.habit));
    }

    return (
        <div className="flex flex-col gap-4">
            <HabitsList
                habits={habits}
                onAddHabit={onAddHabit}
                onDeleteHabit={onDeleteHabit}
                setHabits={setHabits}
            />
        </div>
    )
}