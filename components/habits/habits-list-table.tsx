"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { HabitsListTableRow } from "./habits-list-table-row";

interface HabitsListTableProps {
    habits: any[];
    onDeleteHabit: (habit: any) => void;
    setHabits: any;
}

export function HabitsListTable({ habits, onDeleteHabit, setHabits }: HabitsListTableProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setHabits((habits: any[]) => {
                const oldIndex = habits.indexOf(active.id);
                const newIndex = habits.indexOf(over.id);

                return arrayMove(habits, oldIndex, newIndex);
            });
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Habit</TableHead>
                    <TableHead className="w-max">Positive / Neutral / Negative</TableHead>
                    <TableHead>Time of Day</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
                    <SortableContext items={habits} strategy={horizontalListSortingStrategy}>
                        {habits.map((habit, i) => (
                            <HabitsListTableRow key={i} id={habit} habit={habit} onDeleteHabit={onDeleteHabit} />
                        ))}
                    </SortableContext>
                </DndContext>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">{habits.length} habits</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
