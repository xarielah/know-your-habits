import { IHabit } from "@/lib/models/Habit";
import { AddHabit } from "./add-habit";
import { HabitsListTable } from "./habits-list-table";

interface HabitsListProps {
    habits: IHabit[];
    onAddHabit: (habit: IHabit) => void;
    onDeleteHabit: (habit: IHabit) => void;
    setHabits: (habits: IHabit[]) => void;
    currentDate: Date;
    canDragAndDrop: boolean;
    loading: boolean
}

export default function HabitsList({ habits, onAddHabit, onDeleteHabit, setHabits, currentDate, canDragAndDrop, loading }: HabitsListProps) {
    return (
        <div className="flex flex-col gap-4">
            <HabitsListTable
                canDragAndDrop={canDragAndDrop}
                habits={habits}
                onDeleteHabit={onDeleteHabit}
                setHabits={setHabits}
                currentDate={currentDate}
                loading={loading}
            />
            <div className="flex justify-end">
                <AddHabit onAddHabit={onAddHabit} disabled={loading} />
            </div>
        </div>
    )
}