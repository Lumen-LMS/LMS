import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function CourseSettingsPage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<div className="max-w-2xl space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>{t("course.settings")}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							{t("course.settingsPlaceholder")}
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
