export default function readSessionString(key: string): string {
  const value = sessionStorage.getItem(key);
  if (!value) {
    return "";
  }

  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "string" ? parsed : value;
  } catch {
    return value;
  }
}
