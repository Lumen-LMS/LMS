import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";
import type { Course } from "../model/types";

interface CourseCardProps {
	course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
	const { t } = useTranslation();

	return (
		<Link to="/courses/$courseId" params={{ courseId: course.id }}>
			<Card className="h-full transition-shadow hover:shadow-lg cursor-pointer">
				<CardHeader className="pb-2">
					<div className="flex items-center gap-3">
						<Avatar className="h-12 w-12 rounded-md">
							<AvatarImage src={course.logoUrl} alt={course.name} />
							<AvatarFallback className="rounded-md">
								{course.shortName}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<h3 className="font-semibold truncate">{course.name}</h3>
							<p className="text-sm text-muted-foreground">{course.semester}</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="pb-2">
					<p className="text-sm text-muted-foreground line-clamp-2">
						{course.description}
					</p>
				</CardContent>
				<CardFooter className="flex flex-col gap-2">
					<div className="flex items-center gap-2 w-full">
						<Avatar className="h-6 w-6">
							<AvatarImage src={course.instructor.avatarUrl} />
							<AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
						</Avatar>
						<span className="text-sm text-muted-foreground truncate">
							{course.instructor.name}
						</span>
					</div>
					<div className="w-full">
						<div className="flex justify-between text-sm mb-1">
							<span className="text-muted-foreground">
								{t("home.progress")}
							</span>
							<span>{course.progress}%</span>
						</div>
						<Progress value={course.progress} className="h-2" />
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}
