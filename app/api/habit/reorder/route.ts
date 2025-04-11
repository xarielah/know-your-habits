import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { getUnauthedResponse } from "../../api.utils";
import { habitsService } from "../services/habits.server.service";

export interface ReorderPayload {
  _id: string;
  order: number;
}

export const PUT = auth(async function (req) {
  try {
    if (!req.auth) {
      return NextResponse.json(...getUnauthedResponse());
    }
    let { data: habits }: Awaited<{ data: ReorderPayload[] }> =
      await req.json();

    // Expected format:
    // [
    //   { _id: "1", order: 1 },
    //   { _id: "2", order: 2 },
    //   { _id: "3", order: 3 },
    // ]

    const reorderPromises: Array<Promise<void>> = [];

    const userId = req.auth.user._id;

    habits.forEach((habit) => {
      reorderPromises.push(
        habitsService.reorder(habit._id, userId, habit.order)
      );
    });

    await Promise.all(reorderPromises);

    return NextResponse.json({
      message: "Reordered your habits",
      data: habits,
    });
  } catch (error) {
    console.log("ERROR: couldn't reorder habits: ", error);
    return NextResponse.json(
      { err: `Couldn't reorder your habits` },
      { status: 400 }
    );
  }
});
