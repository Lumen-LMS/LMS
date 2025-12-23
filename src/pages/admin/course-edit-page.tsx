import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { mockCourses } from "@/entities/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function AdminCourseEditPage() {
	const { t } = useTranslation();
	const { courseId } = useParams({ strict: false });
	const course = mockCourses.find((c) => c.id === courseId);

	if (!course) {
		return (
			<div className="p-4 md:p-6">
				<p>{t("admin.courses.notFound")}</p>
			</div>
		);
	}

	return (
		<div className="p-4 md:p-6">
			<div className="max-w-2xl">
				<Card>
					<CardHeader>
						<CardTitle>
							{t("admin.courses.editTitle")}: {course.name}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							{t("admin.courses.formPlaceholder")}
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
