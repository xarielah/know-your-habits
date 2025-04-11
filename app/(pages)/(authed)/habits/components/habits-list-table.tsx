"use client";

import { Spinner } from "@/components/ui/spinner";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { IHabit } from "@/lib/models/Habit";
import { habitsService } from "@/services/habits/habits.client.service";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useId } from "react";
import { HabitsListTableRow } from "./habits-list-table-row";

interface HabitsListTableProps {
    habits: IHabit[];
    onDeleteHabit: (habit: IHabit) => void;
    setHabits: (habits: IHabit[]) => void;
    currentDate: Date;
    canDragAndDrop: boolean
    loading: boolean
}

export function HabitsListTable({ habits, onDeleteHabit, setHabits, currentDate, canDragAndDrop, loading }: HabitsListTableProps) {
    const id = useId();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = habits.findIndex(h => h._id === active.id);
            const newIndex = habits.findIndex(h => h._id === over.id);

            const reorderedHabits = arrayMove(habits, oldIndex, newIndex);

            habitsService.reorder(reorderedHabits);

            setHabits(reorderedHabits);
        }
    }

    return (
        <DndContext
            id={id}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Habit</TableHead>
                        <TableHead></TableHead>
                        <TableHead>When?</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {habits.length > 0 &&
                        <SortableContext items={habits.map(h => h._id)} strategy={verticalListSortingStrategy}>
                            {habits.map((habit) => (
                                <HabitsListTableRow
                                    key={habit._id}
                                    id={habit._id}
                                    habit={habit}
                                    canDragAndDrop={canDragAndDrop}
                                    onDeleteHabit={onDeleteHabit}
                                />
                            ))}
                        </SortableContext>}
                    {(habits.length === 0 && !loading) && <TableRow>
                        <TableCell
                            colSpan={5}
                            className="text-center py-4 w-full text-gray-400">
                            Start adding your habits for {currentDate.toLocaleDateString()} to view them in the list
                        </TableCell>
                    </TableRow>}
                    {loading && <TableRow>
                        <TableCell
                            colSpan={5}
                            className="text-center py-4 w-full text-gray-400">
                            <Spinner className="w-12 h-12 text-gray-300" />
                        </TableCell>
                    </TableRow>}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5} className="text-right">Total of {habits.length} habits</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </DndContext>
    )
}
