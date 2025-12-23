import { Outlet } from "@tanstack/react-router";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient-bg">
      <Outlet />
    </div>
  );
}
