import { ReorderPayload } from "@/app/api/habit/reorder/route";
import { IHabit } from "@/lib/models/Habit";
import { httpService } from "../http.service";

export const habitsService = {
  remove,
  add,
  get,
  update,
  reorder,
};

async function get(filterBy = {}): Promise<IHabit[]> {
  return httpService
    .get<IHabit[]>("/api/habit", { params: filterBy })
    .then((res) => res.data);
}

async function add(habit: IHabit): Promise<IHabit> {
  return httpService
    .post<IHabit>("/api/habit", {
      data: habit,
    })
    .then((res) => res.data);
}

async function update(habit: IHabit): Promise<IHabit> {
  return httpService
    .put<IHabit>(`/api/habit/${habit._id}`, {
      data: habit,
    })
    .then((res) => res.data);
}

async function remove(habitId: string) {
  return httpService
    .delete<IHabit>(`/api/habit/${habitId}`)
    .then((res) => res.data);
}

async function reorder(habits: IHabit[]) {
  const payload = habits.reduce<ReorderPayload[]>((acc, habit, index) => {
    acc.push({ _id: habit._id, order: index * 100 });
    return acc;
  }, []);

  return httpService.put<void>("/api/habit/reorder", { data: payload });
}
