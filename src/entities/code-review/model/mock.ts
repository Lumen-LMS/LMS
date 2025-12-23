import { faker } from "@faker-js/faker/locale/ru";
import type { CodeReview, ReviewStatus } from "./types";

const assignmentNames = [
	"Lab 1: HTTP Server",
	"Lab 2: REST API",
	"Lab 3: Database Integration",
	"Lab 4: Authentication",
	"Lab 5: Testing",
];

export const createMockCodeReview = (index: number): CodeReview => {
	const status: ReviewStatus = faker.helpers.arrayElement([
		"pending",
		"in_review",
		"approved",
		"rejected",
	]);
	const prNumber = faker.number.int({ min: 1, max: 100 });

	return {
		id: faker.string.uuid(),
		assignmentId: faker.string.uuid(),
		assignmentName: assignmentNames[index % assignmentNames.length],
		prUrl: `https://github.com/itmo-lms/course-repo/pull/${prNumber}`,
		prNumber,
		status,
		reviewer: status !== "pending" ? faker.person.fullName() : undefined,
		submittedAt: faker.date.recent({ days: 14 }),
		reviewedAt:
			status === "approved" || status === "rejected"
				? faker.date.recent({ days: 7 })
				: undefined,
		comments:
			status !== "pending" ? faker.number.int({ min: 0, max: 15 }) : undefined,
	};
};

export const createMockCodeReviews = (count: number = 5): CodeReview[] =>
	Array.from({ length: count }, (_, i) => createMockCodeReview(i));
