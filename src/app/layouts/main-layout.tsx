import { Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { Header } from "@/widgets/header";
import { AppSidebar } from "@/widgets/sidebar";

export function MainLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Header />
				<main className="flex-1 overflow-auto">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
