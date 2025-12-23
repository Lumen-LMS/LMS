import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function CourseAssignmentsPage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<div className="max-w-4xl space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>{t("course.assignments")}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							{t("course.assignmentsPlaceholder")}
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
