import { useTranslation } from "react-i18next";
import { CodeReviewsList } from "@/widgets/code-reviews-list";

export function CourseReviewsPage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<h1 className="text-2xl font-semibold mb-6">{t("reviews.title")}</h1>
			<CodeReviewsList />
		</div>
	);
}
