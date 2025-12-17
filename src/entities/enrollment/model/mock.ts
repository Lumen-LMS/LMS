import { faker } from "@faker-js/faker/locale/ru";
import { mockCourses } from "@/entities/course";
import { mockUser, mockUsers } from "@/entities/user";
import type { CourseEnrollment, CourseRole } from "./types";

faker.seed(12346);

export function createMockEnrollment(
  userId: string,
  courseId: string,
  role: CourseRole,
): CourseEnrollment {
  return {
    id: faker.string.uuid(),
    userId,
    courseId,
    role,
  };
}

const currentUserEnrollments: CourseEnrollment[] = mockCourses.map((course) =>
  createMockEnrollment(mockUser.id, course.id, "lecturer"),
);

const otherUsersEnrollments: CourseEnrollment[] = [];

for (const user of mockUsers.slice(1)) {
  const numCourses = faker.number.int({ min: 1, max: 3 });
  const courses = faker.helpers.arrayElements(mockCourses, numCourses);

  for (const course of courses) {
    const role = faker.helpers.weightedArrayElement<CourseRole>([
      { value: "student", weight: 70 },
      { value: "mentor", weight: 15 },
      { value: "practitioner", weight: 10 },
      { value: "lecturer", weight: 5 },
    ]);
    otherUsersEnrollments.push(createMockEnrollment(user.id, course.id, role));
  }
}

export const mockEnrollments: CourseEnrollment[] = [
  ...currentUserEnrollments,
  ...otherUsersEnrollments,
];

export function getMockEnrollmentsForUser(userId: string): CourseEnrollment[] {
  return mockEnrollments.filter((e) => e.userId === userId);
}

export function getMockEnrollmentsForCourse(
  courseId: string,
): CourseEnrollment[] {
  return mockEnrollments.filter((e) => e.courseId === courseId);
}
