import { useTranslation } from "react-i18next";
import { AUDIT_ACTION_LABELS, getMockAuditLogs } from "@/entities/audit-log";
import { Badge } from "@/shared/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/table";

export function AdminAuditPage() {
	const { t } = useTranslation();
	const { entries } = getMockAuditLogs({ pageSize: 50 });

	return (
		<div className="p-4 md:p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold">{t("admin.audit.title")}</h1>
				<p className="text-muted-foreground">{t("admin.audit.subtitle")}</p>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{t("admin.audit.table.timestamp")}</TableHead>
							<TableHead>{t("admin.audit.table.user")}</TableHead>
							<TableHead>{t("admin.audit.table.action")}</TableHead>
							<TableHead>{t("admin.audit.table.ip")}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{entries.map((entry) => (
							<TableRow key={entry.id}>
								<TableCell className="text-muted-foreground">
									{entry.timestamp.toLocaleString("ru-RU")}
								</TableCell>
								<TableCell className="font-medium">{entry.userName}</TableCell>
								<TableCell>
									<Badge variant="outline">
										{AUDIT_ACTION_LABELS[entry.action]}
									</Badge>
								</TableCell>
								<TableCell className="text-muted-foreground">
									{entry.ip}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
