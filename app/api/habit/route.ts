import { auth } from "@/auth";
import { HabitDocument } from "@/lib/models/Habit";
import { NextResponse } from "next/server";
import { getUnauthedResponse } from "../api.utils";
import { habitsService } from "./services/habits.server.service";

export const GET = auth(async function (req) {
  try {
    if (!req.auth) {
      return NextResponse.json(...getUnauthedResponse());
    }

    const userId = req.auth.user._id;

    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    if (!from) {
      throw new Error("From date is missing");
    }

    const habits = await habitsService.get({ from, to, userId });
    return NextResponse.json(habits);
  } catch (error) {
    console.error("ERROR: couldn't get habits: ", error);
    return NextResponse.json({ err: `Couldn't get habits` }, { status: 400 });
  }
});

export const POST = auth(async function (req) {
  try {
    if (!req.auth) {
      return NextResponse.json(...getUnauthedResponse());
    }
    let habit = await req.json();
    habit = habit.data;

    const habitToCreate: HabitDocument = {
      timeOfDay: habit.timeOfDay,
      type: habit.type,
      description: habit.description,
      userId: req.auth?.user._id,
    };

    const newHabit = await habitsService.add(habitToCreate);

    return NextResponse.json(newHabit, { status: 201 });
  } catch (error) {
    console.error("ERROR: couldn't update habit: ", error);
    return NextResponse.json({ err: `Couldn't create habit` }, { status: 400 });
  }
});
