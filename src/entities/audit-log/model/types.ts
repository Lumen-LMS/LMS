export type AuditAction =
  | "login"
  | "logout"
  | "grade_create"
  | "grade_update"
  | "grade_delete"
  | "review_submit"
  | "review_approve"
  | "review_reject"
  | "course_create"
  | "course_update"
  | "course_delete"
  | "user_create"
  | "user_update"
  | "user_delete"
  | "enrollment_create"
  | "enrollment_update"
  | "enrollment_delete"
  | "material_view"
  | "material_create"
  | "material_update"
  | "feedback_submit";

export type AuditTargetType =
  | "user"
  | "course"
  | "grade"
  | "review"
  | "material"
  | "enrollment"
  | "feedback";

export interface AuditEntry {
  id: string;
  action: AuditAction;
  userId: string;
  userName: string;
  targetId?: string;
  targetType?: AuditTargetType;
  details?: Record<string, unknown>;
  timestamp: Date;
  ip?: string;
}

export const AUDIT_ACTION_LABELS: Record<AuditAction, string> = {
  login: "Вход в систему",
  logout: "Выход из системы",
  grade_create: "Выставление оценки",
  grade_update: "Изменение оценки",
  grade_delete: "Удаление оценки",
  review_submit: "Отправка на ревью",
  review_approve: "Одобрение ревью",
  review_reject: "Отклонение ревью",
  course_create: "Создание курса",
  course_update: "Изменение курса",
  course_delete: "Удаление курса",
  user_create: "Создание пользователя",
  user_update: "Изменение пользователя",
  user_delete: "Удаление пользователя",
  enrollment_create: "Запись на курс",
  enrollment_update: "Изменение записи",
  enrollment_delete: "Удаление записи",
  material_view: "Просмотр материала",
  material_create: "Добавление материала",
  material_update: "Изменение материала",
  feedback_submit: "Отправка обратной связи",
};
