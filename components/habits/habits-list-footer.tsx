import { AddHabit } from "./add-habit";

interface HabitsListFooterProps {
    onAddHabit: (habit: any) => void;
}

export default function HabitsListFooter({ onAddHabit }: HabitsListFooterProps) {
    return (
        <div className="flex justify-end">
            <AddHabit onAddHabit={onAddHabit} />
        </div>
    )
}