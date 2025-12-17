import { faker } from "@faker-js/faker/locale/ru";
import type { Material, MaterialType } from "./types";

const materialData: { title: string; type: MaterialType }[] = [
	{ title: "Лекция 1: Введение в курс", type: "video" },
	{ title: "Слайды к лекции 1", type: "presentation" },
	{ title: "Методические указания", type: "pdf" },
	{ title: "Лекция 2: Основные концепции", type: "video" },
	{ title: "Слайды к лекции 2", type: "presentation" },
	{ title: "Дополнительные материалы", type: "link" },
	{ title: "Практическое руководство", type: "pdf" },
	{ title: "Лекция 3: Практические примеры", type: "video" },
];

export const createMockMaterial = (index: number): Material => {
	const data = materialData[index % materialData.length];

	return {
		id: faker.string.uuid(),
		title: data.title,
		description: faker.helpers.maybe(() => faker.lorem.sentence(), {
			probability: 0.5,
		}),
		type: data.type,
		url:
			data.type === "link"
				? faker.internet.url()
				: `https://storage.example.com/files/${faker.string.alphanumeric(10)}`,
		fileSize:
			data.type !== "link"
				? faker.number.int({ min: 100000, max: 50000000 })
				: undefined,
		duration:
			data.type === "video"
				? faker.number.int({ min: 300, max: 5400 })
				: undefined,
		createdAt: faker.date.recent({ days: 60 }),
		order: index + 1,
	};
};

export const createMockMaterials = (count: number = 8): Material[] =>
	Array.from({ length: count }, (_, i) => createMockMaterial(i));
