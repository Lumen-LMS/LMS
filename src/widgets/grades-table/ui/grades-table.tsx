import { useTranslation } from "react-i18next";
import { createMockGrades, GradeBadge } from "@/entities/grade";
import { formatDate } from "@/shared/lib/format";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/table";

const grades = createMockGrades(8);

export function GradesTable() {
	const { t } = useTranslation();

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>{t("grades.assignment")}</TableHead>
						<TableHead className="text-center">{t("grades.score")}</TableHead>
						<TableHead className="text-right">
							{t("grades.submittedAt")}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{grades.map((grade) => (
						<TableRow key={grade.id}>
							<TableCell className="font-medium">
								{grade.assignmentName}
							</TableCell>
							<TableCell className="text-center">
								<GradeBadge grade={grade} />
							</TableCell>
							<TableCell className="text-right">
								{formatDate(grade.submittedAt)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
