import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { mockCourses } from "@/entities/course";
import { Button } from "@/shared/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/table";

export function AdminCoursesPage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">{t("admin.courses.title")}</h1>
					<p className="text-muted-foreground">{t("admin.courses.subtitle")}</p>
				</div>
				<Button asChild>
					<Link to="/admin/courses/new">
						<Plus className="mr-2 h-4 w-4" />
						{t("admin.courses.create")}
					</Link>
				</Button>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{t("admin.courses.table.name")}</TableHead>
							<TableHead>{t("admin.courses.table.semester")}</TableHead>
							<TableHead>{t("admin.courses.table.instructor")}</TableHead>
							<TableHead className="w-[100px]" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{mockCourses.map((course) => (
							<TableRow key={course.id}>
								<TableCell className="font-medium">{course.name}</TableCell>
								<TableCell>{course.semester}</TableCell>
								<TableCell>{course.instructor.name}</TableCell>
								<TableCell>
									<Button variant="ghost" size="sm" asChild>
										<Link
											to="/admin/courses/$courseId"
											params={{ courseId: course.id }}
										>
											{t("common.edit")}
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
