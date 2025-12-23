export function formatDate(date: Date | null): string {
  if (!date) return "-";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatFileSize(bytes: number | undefined): string | null {
  if (!bytes) return null;

  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDuration(seconds: number | undefined): string | null {
  if (!seconds) return null;

  const mins = Math.floor(seconds / 60);

  const secs = seconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
