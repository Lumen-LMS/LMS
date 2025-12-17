import { Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AdminSidebar } from "@/widgets/admin-sidebar";
import { Header } from "@/widgets/header";

export function AdminLayout() {
	return (
		<SidebarProvider>
			<AdminSidebar />
			<SidebarInset>
				<Header />
				<main className="flex-1 overflow-auto">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
