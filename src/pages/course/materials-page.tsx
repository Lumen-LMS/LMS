import { useTranslation } from "react-i18next";
import { MaterialsList } from "@/widgets/materials-list";

export function CourseMaterialsPage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<h1 className="text-2xl font-semibold mb-6">{t("materials.title")}</h1>
			<MaterialsList />
		</div>
	);
}
