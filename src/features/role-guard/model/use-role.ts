import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import type { CourseRole } from "@/entities/enrollment";
import { hasMinCourseRole } from "@/entities/enrollment";
import { useAuth } from "@/features/auth";

export function useCourseRole(): CourseRole | null {
  const { courseId } = useParams({ strict: false });
  const { getCourseRole } = useAuth();

  return useMemo(() => {
    if (!courseId) return null;

    return getCourseRole(courseId);
  }, [courseId, getCourseRole]);
}

export function useHasMinCourseRole(requiredRole: CourseRole): boolean {
  const role = useCourseRole();

  return hasMinCourseRole(role, requiredRole);
}

export function useIsAdmin(): boolean {
  const { isAdmin } = useAuth();

  return isAdmin;
}
