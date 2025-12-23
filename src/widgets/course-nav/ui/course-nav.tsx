import { Link, useParams } from "@tanstack/react-router";

import {
  FileText,
  GitPullRequest,
  GraduationCap,
  MessageSquare,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/shared/ui/card";

const navItems = [
  {
    key: "grades",
    icon: GraduationCap,
    to: "/courses/$courseId/grades" as const,
  },
  {
    key: "reviews",
    icon: GitPullRequest,
    to: "/courses/$courseId/reviews" as const,
  },
  {
    key: "materials",
    icon: FileText,
    to: "/courses/$courseId/materials" as const,
  },
  {
    key: "feedback",
    icon: MessageSquare,
    to: "/courses/$courseId/feedback" as const,
  },
];

export function CourseNav() {
  const { t } = useTranslation();
  const { courseId } = useParams({ strict: false });

  if (!courseId) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              params={{ courseId }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-center"
            >
              <item.icon className="h-6 w-6 text-muted-foreground" />
              <span className="text-sm font-medium">
                {t(`course.${item.key}` as const)}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
