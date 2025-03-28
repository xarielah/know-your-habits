import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { habitsService } from "../services/habits.server.service";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ habitId: string }> }
) {
  try {
    const { habitId } = await params;

    if (!habitId || !isValidObjectId(habitId)) {
      throw new Error("Habit ID is missing or invalid");
    }

    await habitsService.delete(habitId);

    return NextResponse.json({
      message: `Deleted with id ${habitId} was delete`,
    });
  } catch (error) {
    console.error("ERROR: couldn't delete habit: ", error);
    return NextResponse.json({ err: `Couldn't delete habit` }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    return NextResponse.json({ message: "PUT Hello World" });
  } catch (error) {
    console.error("ERROR: couldn't update habit: ", error);
    return NextResponse.json({ err: `Couldn't update habit` }, { status: 400 });
  }
}
