import { Document, model, models, Schema } from "mongoose";

export enum HabitTypesEnum {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  NEUTRAL = "neutral",
}

export enum HabitTimeOfDayEnum {
  MORNING = "morning",
  NOON = "noon",
  AFTERNOON = "afternoon",
  EVENING = "evening",
  NIGHT = "night",
  LATENIGHT = "latenight",
}

export interface IHabit extends Document<string> {
  description: string;
  type: string;
  timeOfDay: string;
  order: number;
}

const habitSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: HabitTypesEnum,
      default: HabitTypesEnum.POSITIVE,
    },
    userId: {
      type: String,
      required: true,
    },
    timeOfDay: {
      type: String,
      required: true,
      enum: HabitTimeOfDayEnum,
      default: HabitTimeOfDayEnum.MORNING,
    },
    order: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Habit = models.Habit || model<IHabit>("Habit", habitSchema);

export default Habit;
