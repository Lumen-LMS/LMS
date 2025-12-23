import { faker } from "@faker-js/faker/locale/ru";
import { mockUsers } from "@/entities/user";
import type { AuditAction, AuditEntry, AuditTargetType } from "./types";

faker.seed(12347);

const actions: AuditAction[] = [
  "login",
  "logout",
  "grade_create",
  "grade_update",
  "review_submit",
  "review_approve",
  "review_reject",
  "material_view",
  "feedback_submit",
  "enrollment_create",
];

const targetTypes: AuditTargetType[] = [
  "user",
  "course",
  "grade",
  "review",
  "material",
  "enrollment",
  "feedback",
];

function createMockAuditEntry(): AuditEntry {
  const user = faker.helpers.arrayElement(mockUsers);
  const action = faker.helpers.arrayElement(actions);

  const entry: AuditEntry = {
    id: faker.string.uuid(),
    action,
    userId: user.id,
    userName: `${user.lastName} ${user.firstName}`,
    timestamp: faker.date.recent({ days: 30 }),
    ip: faker.internet.ipv4(),
  };

  if (!["login", "logout"].includes(action)) {
    entry.targetId = faker.string.uuid();
    entry.targetType = faker.helpers.arrayElement(targetTypes);
    entry.details = {
      description: faker.lorem.sentence(),
    };
  }

  return entry;
}

export const mockAuditLogs: AuditEntry[] = Array.from({ length: 200 }, () =>
  createMockAuditEntry(),
).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

export function getMockAuditLogs(options?: {
  page?: number;
  pageSize?: number;
  action?: AuditAction;
  userId?: string;
}): { entries: AuditEntry[]; total: number } {
  const { page = 1, pageSize = 20, action, userId } = options ?? {};

  let filtered = mockAuditLogs;

  if (action) {
    filtered = filtered.filter((e) => e.action === action);
  }

  if (userId) {
    filtered = filtered.filter((e) => e.userId === userId);
  }

  const start = (page - 1) * pageSize;
  const entries = filtered.slice(start, start + pageSize);

  return {
    entries,
    total: filtered.length,
  };
}
