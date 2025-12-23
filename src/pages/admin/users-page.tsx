import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { mockUsers } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui/table";

export function AdminUsersPage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<div className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">{t("admin.users.title")}</h1>
					<p className="text-muted-foreground">{t("admin.users.subtitle")}</p>
				</div>
				<Button asChild>
					<Link to="/admin/users/new">
						<Plus className="mr-2 h-4 w-4" />
						{t("admin.users.create")}
					</Link>
				</Button>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>{t("admin.users.table.name")}</TableHead>
							<TableHead>{t("admin.users.table.email")}</TableHead>
							<TableHead>{t("admin.users.table.group")}</TableHead>
							<TableHead>{t("admin.users.table.role")}</TableHead>
							<TableHead className="w-[100px]" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{mockUsers.slice(0, 20).map((user) => (
							<TableRow key={user.id}>
								<TableCell className="font-medium">
									{user.lastName} {user.firstName}
								</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.group}</TableCell>
								<TableCell>{t(`roles.${user.systemRole}`)}</TableCell>
								<TableCell>
									<Button variant="ghost" size="sm" asChild>
										<Link
											to="/admin/users/$userId"
											params={{ userId: user.id }}
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
