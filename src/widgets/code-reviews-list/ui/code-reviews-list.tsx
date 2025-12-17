import { ExternalLink, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  createMockCodeReviews,
  ReviewStatusBadge,
} from "@/entities/code-review";

import { formatDate } from "@/shared/lib/format";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

const reviews = createMockCodeReviews(5);

export function CodeReviewsList() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base">
                {review.assignmentName}
              </CardTitle>
              <ReviewStatusBadge status={review.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href={review.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              PR #{review.prNumber}
            </a>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                {t("reviews.submittedAt")}: {formatDate(review.submittedAt)}
              </span>
              {review.comments !== undefined && (
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {review.comments}
                </span>
              )}
              {review.reviewer && (
                <Badge variant="outline">{review.reviewer}</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
