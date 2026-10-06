// car_most_recent_wash is a unix timestamp in seconds (0 / missing = never washed)
export function formatWashDate(timestamp?: number): string {
  if (!timestamp) return "Endnu ikke vasket";
  return new Date(timestamp * 1000).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
