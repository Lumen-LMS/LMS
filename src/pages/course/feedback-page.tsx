import { useTranslation } from "react-i18next";
import { FeedbackForm } from "@/features/feedback-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";

export function CourseFeedbackPage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<Card className="max-w-2xl">
				<CardHeader>
					<CardTitle>{t("feedback.title")}</CardTitle>
					<CardDescription>{t("feedback.subtitle")}</CardDescription>
				</CardHeader>
				<CardContent>
					<FeedbackForm />
				</CardContent>
			</Card>
		</div>
	);
}
