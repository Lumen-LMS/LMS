import { useTranslation } from "react-i18next";
import { Badge } from "@/shared/ui/badge";
import type { Grade } from "../model/types";

interface GradeBadgeProps {
	grade: Grade;
}

export function GradeBadge({ grade }: GradeBadgeProps) {
	const { t } = useTranslation();

	if (grade.submittedAt === null) {
		return <Badge variant="outline">{t("grades.notSubmitted")}</Badge>;
	}

	if (grade.score === null) {
		return <Badge variant="secondary">{t("grades.notGraded")}</Badge>;
	}

	const percentage = (grade.score / grade.maxScore) * 100;

	let variant: "default" | "destructive" | "secondary" = "default";
	if (percentage < 40) {
		variant = "destructive";
	} else if (percentage < 70) {
		variant = "secondary";
	}

	return (
		<Badge variant={variant}>
			{grade.score}/{grade.maxScore}
		</Badge>
	);
}
