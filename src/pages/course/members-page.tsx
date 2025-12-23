import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
	getCourseRoleLabel,
	getMockEnrollmentsForCourse,
} from "@/entities/enrollment";
import { mockUsers } from "@/entities/user";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/table";

export function CourseMembersPage() {
	const { t } = useTranslation();
	const { courseId } = useParams({ strict: false });
	const enrollments = courseId ? getMockEnrollmentsForCourse(courseId) : [];

	const membersWithDetails = enrollments.map((enrollment) => {
		const user = mockUsers.find((u) => u.id === enrollment.userId);
		return { ...enrollment, user };
	});

	return (
		<div className="p-4 md:p-6">
			<div className="max-w-4xl space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>{t("course.members")}</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>{t("admin.users.table.name")}</TableHead>
									<TableHead>{t("admin.users.table.email")}</TableHead>
									<TableHead>{t("admin.users.table.role")}</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{membersWithDetails.map((member) => (
									<TableRow key={member.id}>
										<TableCell className="font-medium">
											{member.user
												? `${member.user.lastName} ${member.user.firstName}`
												: "—"}
										</TableCell>
										<TableCell>{member.user?.email ?? "—"}</TableCell>
										<TableCell>
											<Badge variant="secondary">
												{getCourseRoleLabel(member.role)}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
