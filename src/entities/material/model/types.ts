export type MaterialType = "link" | "pdf" | "video" | "presentation";

export interface Material {
	id: string;
	title: string;
	description?: string;
	type: MaterialType;
	url: string;
	fileSize?: number;
	duration?: number;
	createdAt: Date;
	order: number;
}
