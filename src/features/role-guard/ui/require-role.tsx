import type { ReactNode } from "react";
import type { CourseRole } from "@/entities/enrollment";
import { hasMinCourseRole } from "@/entities/enrollment";
import { useAuth } from "@/features/auth";

interface RequireAdminProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function RequireAdmin({ children, fallback = null }: RequireAdminProps) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return fallback;
  }

  return children;
}

interface RequireCourseRoleProps {
  courseId: string;
  minRole: CourseRole;
  children: ReactNode;
  fallback?: ReactNode;
}

export function RequireCourseRole({
  courseId,
  minRole,
  children,
  fallback = null,
}: RequireCourseRoleProps) {
  const { getCourseRole } = useAuth();
  const role = getCourseRole(courseId);

  if (!hasMinCourseRole(role, minRole)) {
    return fallback;
  }

  return children;
}

export function RequireRoleOrAdmin({
  courseId,
  minRole,
  children,
  fallback = null,
}: RequireCourseRoleProps) {
  const { isAdmin, getCourseRole } = useAuth();

  if (isAdmin) {
    return children;
  }

  const role = getCourseRole(courseId);
  if (!hasMinCourseRole(role, minRole)) {
    return fallback;
  }

  return children;
}
