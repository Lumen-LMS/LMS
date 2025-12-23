import { redirect } from "@tanstack/react-router";
import type { User } from "@/entities/user";
import { STORAGE_KEYS } from "@/shared/config/constants";

export function authGuard() {
  const stored = localStorage.getItem(STORAGE_KEYS.AUTH);

  if (!stored) {
    throw redirect({ to: "/login" });
  }
}

export function adminGuard() {
  const stored = localStorage.getItem(STORAGE_KEYS.AUTH);
  if (!stored) {
    throw redirect({ to: "/login" });
  }

  try {
    const user: User = JSON.parse(stored);

    if (user.systemRole !== "admin") {
      throw redirect({ to: "/home" });
    }
  } catch {
    throw redirect({ to: "/login" });
  }
}
