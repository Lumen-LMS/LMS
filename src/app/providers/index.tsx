import "@/shared/i18n/config";
import { AuthProvider } from "@/features/auth";
import { SidebarProvider } from "@/features/sidebar-toggle";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<QueryProvider>
				<AuthProvider>
					<SidebarProvider>{children}</SidebarProvider>
				</AuthProvider>
			</QueryProvider>
		</ThemeProvider>
	);
}
