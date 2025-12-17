import { faker } from "@faker-js/faker/locale/ru";
import type { Grade } from "./types";

const assignmentNames = [
	"Лабораторная работа 1",
	"Лабораторная работа 2",
	"Лабораторная работа 3",
	"Домашнее задание 1",
	"Домашнее задание 2",
	"Контрольная работа",
	"Курсовой проект",
	"Экзамен",
];

export const createMockGrade = (index: number): Grade => {
	const isSubmitted = faker.datatype.boolean();
	const isGraded = isSubmitted && faker.datatype.boolean();
	const maxScore = faker.helpers.arrayElement([10, 20, 50, 100]);

	return {
		id: faker.string.uuid(),
		assignmentId: faker.string.uuid(),
		assignmentName: assignmentNames[index % assignmentNames.length],
		score: isGraded ? faker.number.int({ min: 0, max: maxScore }) : null,
		maxScore,
		submittedAt: isSubmitted ? faker.date.recent({ days: 30 }) : null,
		feedback: isGraded
			? faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 })
			: undefined,
	};
};

export const createMockGrades = (count: number = 8): Grade[] =>
	Array.from({ length: count }, (_, i) => createMockGrade(i));
