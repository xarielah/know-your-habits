import { IHabit } from "@/lib/models/Habit";
import HabitsListFooter from "./habits-list-footer";
import { HabitsListTable } from "./habits-list-table";

interface HabitsListProps {
    habits: IHabit[];
    onAddHabit: (habit: IHabit) => void;
    onDeleteHabit: (habit: IHabit) => void;
    setHabits: (habits: IHabit[]) => void;
    currentDate: Date;
}

export default function HabitsList({ habits, onAddHabit, onDeleteHabit, setHabits, currentDate }: HabitsListProps) {
    return (
        <div className="flex flex-col gap-4">
            <HabitsListTable habits={habits} onDeleteHabit={onDeleteHabit} setHabits={setHabits} currentDate={currentDate} />
            <HabitsListFooter onAddHabit={onAddHabit} />
        </div>
    )
}