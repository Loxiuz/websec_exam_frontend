export default function createDateString(dateString: string): string {
  const date = new Date(dateString);

  const timeWithoutSeconds = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return date.toLocaleDateString() + " | " + timeWithoutSeconds;
}