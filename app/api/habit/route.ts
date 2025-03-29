import { NextResponse } from "next/server";
import { habitsService } from "./services/habits.server.service";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    const habits = await habitsService.get({ from, to });
    return NextResponse.json(habits);
  } catch (error) {
    console.error("ERROR: couldn't get habits: ", error);
    return NextResponse.json({ err: `Couldn't get habits` }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    let habit = await req.json();
    habit = habit.data;

    habit.userId = "123";
    const newHabit = await habitsService.add(habit);

    return NextResponse.json(newHabit, { status: 201 });
  } catch (error) {
    console.error("ERROR: couldn't update habit: ", error);
    return NextResponse.json({ err: `Couldn't create habit` }, { status: 400 });
  }
}
