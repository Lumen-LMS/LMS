import { Link, useLocation } from "@tanstack/react-router";

import { BookOpen, FileText, Home, LayoutDashboard, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

import { LanguageSwitch } from "@/features/language-switch";
import { ThemeSwitch } from "@/features/theme-switch";

import { assetUrl } from "@/shared/lib/assets";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shared/ui/sidebar";

import { TooltipProvider } from "@/shared/ui/tooltip";

const adminNavItems = [
  {
    key: "dashboard",
    icon: LayoutDashboard,
    to: "/admin" as const,
  },
  {
    key: "users",
    icon: Users,
    to: "/admin/users" as const,
  },
  {
    key: "courses",
    icon: BookOpen,
    to: "/admin/courses" as const,
  },
  {
    key: "audit",
    icon: FileText,
    to: "/admin/audit" as const,
  },
];

export function AdminSidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 border-b flex items-center justify-center px-2">
        <Link to="/admin" className="flex items-center gap-2 font-semibold">
          <img
            src={assetUrl("/logo192.png")}
            alt="Lumen LMS"
            className="h-8 w-8 shrink-0"
          />
          <span className="group-data-[collapsible=icon]:hidden truncate">
            {t("admin.panelTitle")}
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/home"}
                >
                  <Link to="/home">
                    <Home className="shrink-0" />
                    <span>{t("nav.home")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("admin.title")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.to === "/admin"
                        ? location.pathname === "/admin"
                        : location.pathname.startsWith(item.to)
                    }
                  >
                    <Link to={item.to}>
                      <item.icon className="shrink-0" />
                      <span>{t(`admin.nav.${item.key}`)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <TooltipProvider>
          <div className="flex items-center justify-center gap-1">
            <ThemeSwitch />
            <div className="group-data-[collapsible=icon]:hidden">
              <LanguageSwitch />
            </div>
          </div>
        </TooltipProvider>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
