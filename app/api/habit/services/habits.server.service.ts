import dbConnect from "@/lib/db-connect";
import Habit, { HabitDocument, IHabit } from "@/lib/models/Habit";
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

type ApiFilterBy = { userId: string } & FilterBy;

async function get(filterBy: ApiFilterBy) {
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

    filters.createdAt;
  }

  filters.userId = filterBy.userId;

  return Habit.find(filters).sort({ order: 1 }).exec();
}

async function add(habit: HabitDocument) {
  await dbConnect();
  return Habit.create(habit);
}

async function del(habitId: string, userId: string): Promise<void> {
  await dbConnect();
  await Habit.findOneAndDelete({ _id: habitId, userId });
}

async function reorder(
  habitId: string,
  userId: string,
  order: number
): Promise<void> {
  await dbConnect();
  await Habit.findOneAndUpdate({ _id: habitId, userId }, { order });
}
