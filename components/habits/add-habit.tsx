"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface AddHabitProps {
    onAddHabit: (habit: any) => void;
}

export function AddHabit({ onAddHabit }: AddHabitProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [newHabit, setNewHabit] = useState({
        description: "",
        type: "positive",
        timeOfDay: "morning",
    })

    useEffect(() => {
        if (newHabit.description.trim()) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [newHabit])

    const handleChange = (e: any) => {
        setNewHabit({
            ...newHabit,
            [e.target.name]: e.target.value
        })
    }

    const handleAddHabit = (habit: any) => {
        onAddHabit(habit);
        setIsDialogOpen(false)
        setNewHabit({
            description: '',
            type: 'positive',
            timeOfDay: 'morning'
        })
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>Add New Habit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Habit</DialogTitle>
                    <DialogDescription>
                        Make sure you add all your habits in-order to keep track of them.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Habit
                        </Label>
                        <Input onChange={handleChange} required id="description" name="description" placeholder="Ex. Woke up / Opened phone / etc..." value={newHabit.description} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Type
                        </Label>
                        <Select onValueChange={value => setNewHabit(prev => ({ ...prev, type: value }))} value={newHabit.type}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="What to do with it?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="positive">Keep {'(+)'}</SelectItem>
                                <SelectItem value="negative">Drop {'(-)'}</SelectItem>
                                <SelectItem value="neutral">Neutral {'(=)'}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Time of day
                        </Label>
                        <Select onValueChange={value => setNewHabit(prev => ({ ...prev, timeOfDay: value }))} value={newHabit.timeOfDay}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="When in the day?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="morning">Morning</SelectItem>
                                <SelectItem value="noon">Noon</SelectItem>
                                <SelectItem value="afternoon">Afternoon</SelectItem>
                                <SelectItem value="evening">Evening</SelectItem>
                                <SelectItem value="night">Night</SelectItem>
                                <SelectItem value="latenight">Late night</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={isDisabled}
                        onClick={() => handleAddHabit(newHabit)}>
                        Add to List
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
