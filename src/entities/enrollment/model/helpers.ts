import {
  COURSE_ROLE_HIERARCHY,
  type CourseEnrollment,
  type CourseRole,
} from "./types";

export function hasMinCourseRole(
  userRole: CourseRole | null,
  requiredRole: CourseRole,
): boolean {
  if (!userRole) return false;

  return COURSE_ROLE_HIERARCHY[userRole] >= COURSE_ROLE_HIERARCHY[requiredRole];
}

export function getUserCourseRole(
  enrollments: CourseEnrollment[],
  courseId: string,
): CourseRole | null {
  const enrollment = enrollments.find((e) => e.courseId === courseId);

  return enrollment?.role ?? null;
}

export function hasMinCourseRoleInCourse(
  enrollments: CourseEnrollment[],
  courseId: string,
  requiredRole: CourseRole,
): boolean {
  const userRole = getUserCourseRole(enrollments, courseId);

  return hasMinCourseRole(userRole, requiredRole);
}

export function getCourseRoleLabel(role: CourseRole): string {
  const labels: Record<CourseRole, string> = {
    lecturer: "Лектор",
    practitioner: "Практик",
    mentor: "Ментор",
    student: "Студент",
  };

  return labels[role];
}
