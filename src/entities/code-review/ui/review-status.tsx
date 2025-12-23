import { useTranslation } from "react-i18next";
import { Badge } from "@/shared/ui/badge";
import type { ReviewStatus } from "../model/types";

interface ReviewStatusBadgeProps {
	status: ReviewStatus;
}

const statusVariants: Record<
	ReviewStatus,
	"default" | "secondary" | "destructive" | "outline"
> = {
	pending: "secondary",
	in_review: "default",
	approved: "outline",
	rejected: "destructive",
};

export function ReviewStatusBadge({ status }: ReviewStatusBadgeProps) {
	const { t } = useTranslation();

	const labels: Record<ReviewStatus, string> = {
		pending: t("reviews.pending"),
		in_review: t("reviews.inReview"),
		approved: t("reviews.approved"),
		rejected: t("reviews.rejected"),
	};

	return (
		<Badge
			variant={statusVariants[status]}
			className={
				status === "approved"
					? "border-green-500 text-green-600 dark:text-green-400"
					: ""
			}
		>
			{labels[status]}
		</Badge>
	);
}
