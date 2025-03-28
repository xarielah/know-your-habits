import dbConnect from "@/lib/dbConnect";
import Habit, { IHabit } from "@/lib/models/Habit";
import { FilterQuery } from "mongoose";

export const habitsService = {
  get,
  add,
  reorder,
  delete: del,
};

export type FilterBy = {
  from?: Date | string | null;
  to?: Date | string | null;
};

async function get(filterBy: FilterBy) {
  await dbConnect();
  let filters: FilterQuery<IHabit> = {};

  if (filterBy.from) {
    const startDate = new Date(filterBy.from);
    startDate.setHours(0, 0, 0, 0);

    let endDate;

    if (filterBy.to) {
      endDate = new Date(filterBy.to);
      endDate.setHours(23, 59, 59, 999);
    } else {
      endDate = new Date(filterBy.from);
      endDate.setHours(23, 59, 59, 999);
    }

    filters.createdAt = { $gte: startDate, $lt: endDate };
  }

  return Habit.find(filters).sort({ order: 1 }).exec();
}

async function add(habit: IHabit) {
  await dbConnect();
  return Habit.create(habit);
}

async function del(habitId: string): Promise<void> {
  await dbConnect();
  await Habit.findByIdAndDelete(habitId);
}

async function reorder(habitId: string, order: number): Promise<void> {
  await dbConnect();
  await Habit.findByIdAndUpdate(habitId, { order: order });
}
