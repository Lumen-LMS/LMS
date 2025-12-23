import { useTranslation } from "react-i18next";
import { STORAGE_KEYS } from "@/shared/config/constants";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

export function LanguageSwitch() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ru" ? "en" : "ru";

    i18n.changeLanguage(newLang);

    localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLang);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          className="h-8 w-8 font-medium"
        >
          {i18n.language === "ru" ? "RU" : "EN"}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{i18n.language === "ru" ? "English" : "Русский"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
