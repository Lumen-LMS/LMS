export type ReviewStatus = "pending" | "in_review" | "approved" | "rejected";

export interface CodeReview {
	id: string;
	assignmentId: string;
	assignmentName: string;
	prUrl: string;
	prNumber: number;
	status: ReviewStatus;
	reviewer?: string;
	submittedAt: Date;
	reviewedAt?: Date;
	comments?: number;
}
