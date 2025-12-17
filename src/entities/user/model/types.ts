export type SystemRole = "admin" | "user";

export interface User {
	id: string;
	isuId: string;
	email: string;
	firstName: string;
	lastName: string;
	middleName?: string;
	avatarUrl: string;
	group: string;
	course: number;
	faculty: string;
	githubUsername?: string;
	systemRole: SystemRole;
	createdAt: Date;
}
