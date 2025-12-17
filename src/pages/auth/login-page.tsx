import { LoginButton } from "@/features/auth";
import { LanguageSwitch } from "@/features/language-switch";
import { ThemeSwitch } from "@/features/theme-switch";
import { TooltipProvider } from "@/shared/ui/tooltip";

export function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-8 bg-background/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
      <div className="flex flex-col items-center gap-3">
        <img src="/logo512.png" alt="Lumen LMS" className="h-32 w-32" />
        <h1 className="text-3xl font-bold">Lumen LMS</h1>
      </div>
      <LoginButton />
      <TooltipProvider>
        <div className="flex items-center gap-2">
          <ThemeSwitch />
          <LanguageSwitch />
        </div>
      </TooltipProvider>
    </div>
  );
}
