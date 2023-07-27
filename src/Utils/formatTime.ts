export function formatTime(date: Date | string): string {
  const dateValue = typeof date === "string" ? parseDateFromString(date) : date;

  const hours = String(dateValue.getHours()).padStart(2, "0");
  const minutes = String(dateValue.getMinutes()).padStart(2, "0");
  const seconds = String(dateValue.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function parseDateFromString(dateString: string): Date {
  return new Date(dateString);
}
