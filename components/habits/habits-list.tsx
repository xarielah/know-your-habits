import HabitsListFooter from "./habits-list-footer";
import HabitsListHeader from "./habits-list-header";
import { HabitsListTable } from "./habits-list-table";

interface HabitsListProps {
    habits: any[];
    onAddHabit: (habit: any) => void;
    onDeleteHabit: (habit: any) => void;
    setHabits: any;
}

export default function HabitsList({ habits, onAddHabit, onDeleteHabit, setHabits }: HabitsListProps) {
    return (
        <div className="flex flex-col gap-4">
            <HabitsListHeader />
            <HabitsListTable habits={habits} onDeleteHabit={onDeleteHabit} setHabits={setHabits} />
            <HabitsListFooter onAddHabit={onAddHabit} />
        </div>
    )
}