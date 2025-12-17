import { Link, useLocation, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  FileText,
  GitPullRequest,
  GraduationCap,
  Info,
  LogOut,
  MessageSquare,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import { useAuth } from "@/features/auth";
import { LanguageSwitch } from "@/features/language-switch";
import { ThemeSwitch } from "@/features/theme-switch";
import { Button } from "@/shared/ui/button";
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

export function CourseSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { courseId } = useParams({ strict: false });
  const { logout } = useAuth();

  const menuItems = [
    { title: t("course.about"), url: `/courses/${courseId}/about`, icon: Info },
    {
      title: t("course.grades"),
      url: `/courses/${courseId}/grades`,
      icon: GraduationCap,
    },
    {
      title: t("course.reviews"),
      url: `/courses/${courseId}/reviews`,
      icon: GitPullRequest,
    },
    {
      title: t("course.materials"),
      url: `/courses/${courseId}/materials`,
      icon: FileText,
    },
    {
      title: t("course.feedback"),
      url: `/courses/${courseId}/feedback`,
      icon: MessageSquare,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 border-b flex items-center px-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/home" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">
              {t("common.back")}
            </span>
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.courses")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-2">
          <TooltipProvider>
            <div className="flex items-center gap-1">
              <ThemeSwitch />
              <LanguageSwitch />
            </div>
          </TooltipProvider>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={logout}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                <span>{t("common.logout")}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
