import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function AdminCourseCreatePage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<div className="max-w-2xl">
				<Card>
					<CardHeader>
						<CardTitle>{t("admin.courses.createTitle")}</CardTitle>
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
