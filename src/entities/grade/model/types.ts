export interface Assignment {
	id: string;
	name: string;
	maxScore: number;
	weight: number;
	dueDate: Date;
}

export interface Grade {
	id: string;
	assignmentId: string;
	assignmentName: string;
	score: number | null;
	maxScore: number;
	submittedAt: Date | null;
	feedback?: string;
}
