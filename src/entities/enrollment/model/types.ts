export type CourseRole = "lecturer" | "practitioner" | "mentor" | "student";

export const COURSE_ROLE_HIERARCHY: Record<CourseRole, number> = {
	lecturer: 3,
	practitioner: 2,
	mentor: 1,
	student: 0,
};

export interface CourseEnrollment {
	id: string;
	userId: string;
	courseId: string;
	role: CourseRole;
}
