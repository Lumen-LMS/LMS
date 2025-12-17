export interface Instructor {
	name: string;
	email: string;
	avatarUrl: string;
}

export interface Course {
	id: string;
	name: string;
	shortName: string;
	description: string;
	logoUrl: string;
	semester: string;
	credits: number;
	instructor: Instructor;
	progress: number;
}
