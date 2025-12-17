import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function AdminDashboardPage() {
	const { t } = useTranslation();

	return (
		<div className="p-4 md:p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold">{t("admin.dashboard.title")}</h1>
				<p className="text-muted-foreground">{t("admin.dashboard.subtitle")}</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("admin.dashboard.totalUsers")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">50</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("admin.dashboard.totalCourses")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">3</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("admin.dashboard.activeEnrollments")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">127</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("admin.dashboard.todayActions")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">24</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
