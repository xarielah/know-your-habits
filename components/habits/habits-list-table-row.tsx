"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";

interface HabitsListTableRowProps {
    id: any;
    habit: any;
    onDeleteHabit: (habit: any) => void;
}

export function HabitsListTableRow({ id, habit, onDeleteHabit }: HabitsListTableRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow {...attributes} {...listeners} ref={setNodeRef} style={style} className="transition-all hover:cursor-grab active:cursor-grabbing">
            <TableCell className="font-medium">{habit.habit}</TableCell>
            <TableCell>{habit.type}</TableCell>
            <TableCell>{habit.timeOfDay}</TableCell>
            <TableCell>
                <Button variant="destructive" onClick={() => onDeleteHabit(habit)}>Delete</Button>
            </TableCell>
        </TableRow>
    )
}