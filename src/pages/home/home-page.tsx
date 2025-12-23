import { useTranslation } from "react-i18next";
import { CourseGrid } from "@/widgets/course-grid";

export function HomePage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<h1 className="text-2xl font-semibold mb-2">{t("home.title")}</h1>
			<p className="text-muted-foreground mb-6">{t("home.subtitle")}</p>
			<CourseGrid />
		</div>
	);
}
