import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { mockUsers } from "@/entities/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function AdminUserEditPage() {
	const { t } = useTranslation();
	const { userId } = useParams({ strict: false });
	const user = mockUsers.find((u) => u.id === userId);

	if (!user) {
		return (
			<div className="p-4 md:p-6">
				<p>{t("admin.users.notFound")}</p>
			</div>
		);
	}

	return (
		<div className="p-4 md:p-6">
			<div className="max-w-2xl">
				<Card>
					<CardHeader>
						<CardTitle>
							{t("admin.users.editTitle")}: {user.lastName} {user.firstName}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							{t("admin.users.formPlaceholder")}
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
