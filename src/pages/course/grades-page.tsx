import { useTranslation } from "react-i18next";
import { GradesTable } from "@/widgets/grades-table";

export function CourseGradesPage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<h1 className="text-2xl font-semibold mb-6">{t("grades.title")}</h1>
			<GradesTable />
		</div>
	);
}
