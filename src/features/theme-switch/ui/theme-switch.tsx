import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers/theme-provider";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

export function ThemeSwitch() {
	const { theme, setTheme } = useTheme();

	const cycleTheme = () => {
		if (theme === "light") setTheme("dark");
		else if (theme === "dark") setTheme("system");
		else setTheme("light");
	};

	const getIcon = () => {
		if (theme === "light") return <Sun className="h-4 w-4" />;
		if (theme === "dark") return <Moon className="h-4 w-4" />;
		return <Monitor className="h-4 w-4" />;
	};

	const getLabel = () => {
		if (theme === "light") return "Light";
		if (theme === "dark") return "Dark";
		return "System";
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					onClick={cycleTheme}
					className="h-8 w-8"
				>
					{getIcon()}
				</Button>
			</TooltipTrigger>
			<TooltipContent side="top">
				<p>{getLabel()}</p>
			</TooltipContent>
		</Tooltip>
	);
}
