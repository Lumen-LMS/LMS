import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { mockCourses } from "@/entities/course";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { CourseNav } from "@/widgets/course-nav";

export function CourseAboutPage() {
	const { t } = useTranslation();
	const { courseId } = useParams({ strict: false });
	const course = mockCourses.find((c) => c.id === courseId) || mockCourses[0];

	return (
		<div className="p-4 md:p-6">
			<div className="max-w-3xl space-y-6">
				<Card>
					<CardHeader className="flex flex-row items-center gap-4">
						<Avatar className="h-20 w-20 rounded-lg">
							<AvatarImage src={course.logoUrl} alt={course.name} />
							<AvatarFallback className="rounded-lg text-2xl">
								{course.shortName}
							</AvatarFallback>
						</Avatar>
						<div className="space-y-2">
							<CardTitle className="text-2xl">{course.name}</CardTitle>
							<div className="flex items-center gap-2">
								<Badge variant="secondary">{course.semester}</Badge>
								<Badge variant="outline">
									{t("course.credits", { count: course.credits })}
								</Badge>
							</div>
						</div>
					</CardHeader>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{t("course.instructor")}</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center gap-4">
						<Avatar>
							<AvatarImage src={course.instructor.avatarUrl} />
							<AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium">{course.instructor.name}</p>
							<p className="text-sm text-muted-foreground">
								{course.instructor.email}
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>{t("course.description")}</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground whitespace-pre-wrap">
							{course.description}
						</p>
					</CardContent>
				</Card>

				<CourseNav />
			</div>
		</div>
	);
}
