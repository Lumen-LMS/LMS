import { faker } from "@faker-js/faker/locale/ru";
import type { SystemRole, User } from "./types";

faker.seed(12345);

export const createMockUser = (
  overrides?: Partial<User> & { systemRole?: SystemRole },
): User => ({
  id: faker.string.uuid(),
  isuId: faker.string.numeric(6),
  email: faker.internet.email({ provider: "niuitmo.ru" }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  middleName: faker.person.middleName(),
  avatarUrl: faker.image.avatar(),
  group: `M33${faker.string.numeric(2)}`,
  course: faker.number.int({ min: 1, max: 6 }),
  faculty: faker.helpers.arrayElement([
    "Факультет информационных технологий и программирования",
    "Физико-технический факультет",
    "Факультет программной инженерии",
  ]),
  githubUsername: faker.internet.username(),
  systemRole: "user",
  createdAt: faker.date.past(),
  ...overrides,
});

export const mockUser = createMockUser({ systemRole: "admin" });

export const mockUsers: User[] = [
  mockUser,
  ...Array.from({ length: 49 }, () => createMockUser()),
];
