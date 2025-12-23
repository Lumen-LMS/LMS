import { faker } from "@faker-js/faker/locale/ru";
import type { Course } from "./types";

const courseNames = [
	{ name: "Веб-программирование", short: "WEB" },
	{ name: "Базы данных", short: "DB" },
	{ name: "Алгоритмы и структуры данных", short: "ASD" },
	{ name: "Операционные системы", short: "OS" },
	{ name: "Компьютерные сети", short: "NET" },
	{ name: "Машинное обучение", short: "ML" },
];

export const createMockCourse = (): Course => {
	const courseData = faker.helpers.arrayElement(courseNames);

	return {
		id: faker.string.uuid(),
		name: courseData.name,
		shortName: courseData.short,
		description: faker.lorem.paragraphs(3),
		logoUrl: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
		semester: `${faker.helpers.arrayElement(["Осень", "Весна"])} 2024`,
		credits: faker.number.int({ min: 2, max: 6 }),
		instructor: {
			name: faker.person.fullName(),
			email: faker.internet.email({ provider: "itmo.ru" }),
			avatarUrl: faker.image.avatar(),
		},
		progress: faker.number.int({ min: 0, max: 100 }),
	};
};

export const mockCourses = Array.from({ length: 6 }, createMockCourse);
