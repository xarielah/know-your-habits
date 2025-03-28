"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import DynamicTimeOfDay from "./dynamic-time-of-day";
import DynamicType from "./dynamic-type";

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

    const handleDelete = () => {
        onDeleteHabit(habit);
    }

    const isCursorGrabbing = attributes['aria-pressed'];

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell className="w-[50px]">
                <button {...attributes} {...listeners} className={`text-gray-700 flex items-center justify-center ${isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`} aria-describedby={`DndContext-${id}`}>
                    <svg viewBox="0 0 20 20" width="15">
                        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
                            fill="currentColor"></path>
                    </svg>
                </button>
            </TableCell>
            <TableCell className="font-medium">{habit.description}</TableCell>
            <DynamicType value={habit.type} />
            <DynamicTimeOfDay value={habit.timeOfDay} />
            <TableCell>
                <TooltipProvider delayDuration={400}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="cursor-pointer"
                                onClick={handleDelete}>
                                <Trash />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete Row</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </TableCell>
        </TableRow>
    )
}