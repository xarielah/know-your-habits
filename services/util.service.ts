export function isToday(inputDate: Date | string) {
  const date = new Date(inputDate);
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(" ");
}
