import { auth } from "@/auth";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { getUnauthedResponse } from "../../api.utils";
import { habitsService } from "../services/habits.server.service";

/* eslint-disable */
export const DELETE = auth(async function (req, { params }: any) {
  try {
    if (!req.auth) {
      return NextResponse.json(...getUnauthedResponse());
    }

    const { habitId } = await params;

    const userId = req.auth.user._id;

    if (!habitId || !isValidObjectId(habitId)) {
      throw new Error("Habit ID is missing or invalid");
    }

    await habitsService.delete(habitId, userId);

    return NextResponse.json({
      message: `Deleted with id ${habitId} was delete`,
    });
  } catch (error) {
    console.error("ERROR: couldn't delete habit: ", error);
    return NextResponse.json({ err: `Couldn't delete habit` }, { status: 400 });
  }
});

export async function PUT(req: Request) {
  try {
    return NextResponse.json({ message: "PUT Hello World" });
  } catch (error) {
    console.error("ERROR: couldn't update habit: ", error);
    return NextResponse.json({ err: `Couldn't update habit` }, { status: 400 });
  }
}
