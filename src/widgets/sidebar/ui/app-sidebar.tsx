import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  ClipboardList,
  FileText,
  GitPullRequest,
  GraduationCap,
  Home,
  Info,
  MessageSquare,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { mockCourses } from "@/entities/course";

import type { CourseRole } from "@/entities/enrollment";

import { hasMinCourseRole } from "@/entities/enrollment";
import { useAuth } from "@/features/auth";
import { LanguageSwitch } from "@/features/language-switch";
import { ThemeSwitch } from "@/features/theme-switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/shared/ui/sidebar";
import { TooltipProvider } from "@/shared/ui/tooltip";

interface CourseSubItem {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  to:
    | "/courses/$courseId/about"
    | "/courses/$courseId/grades"
    | "/courses/$courseId/reviews"
    | "/courses/$courseId/materials"
    | "/courses/$courseId/feedback"
    | "/courses/$courseId/members"
    | "/courses/$courseId/assignments"
    | "/courses/$courseId/settings";
  minRole: CourseRole;
}

const allCourseSubItems: CourseSubItem[] = [
  {
    key: "about",
    icon: Info,
    to: "/courses/$courseId/about",
    minRole: "student",
  },
  {
    key: "grades",
    icon: GraduationCap,
    to: "/courses/$courseId/grades",
    minRole: "student",
  },
  {
    key: "reviews",
    icon: GitPullRequest,
    to: "/courses/$courseId/reviews",
    minRole: "student",
  },
  {
    key: "materials",
    icon: FileText,
    to: "/courses/$courseId/materials",
    minRole: "student",
  },
  {
    key: "feedback",
    icon: MessageSquare,
    to: "/courses/$courseId/feedback",
    minRole: "student",
  },
  {
    key: "members",
    icon: Users,
    to: "/courses/$courseId/members",
    minRole: "mentor",
  },
  {
    key: "assignments",
    icon: ClipboardList,
    to: "/courses/$courseId/assignments",
    minRole: "practitioner",
  },
  {
    key: "settings",
    icon: Settings,
    to: "/courses/$courseId/settings",
    minRole: "lecturer",
  },
];

export function AppSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const { isAdmin, getCourseRole } = useAuth();
  const isCollapsed = state === "collapsed";

  const isInCourse = (courseId: string) => {
    return location.pathname.startsWith(`/courses/${courseId}`);
  };

  const handleCourseClick = (courseId: string) => {
    if (isCollapsed) {
      navigate({ to: "/courses/$courseId/about", params: { courseId } });
    }
  };

  const getCourseSubItems = (courseId: string) => {
    const userRole = getCourseRole(courseId);

    if (isAdmin) return allCourseSubItems;

    return allCourseSubItems.filter((item) =>
      hasMinCourseRole(userRole, item.minRole),
    );
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 border-b flex items-center justify-center px-2">
        <Link to="/home" className="flex items-center gap-2 font-semibold">
          <img
            src="/logo192.png"
            alt="Lumen LMS"
            className="h-8 w-8 shrink-0"
          />
          <span className="group-data-[collapsible=icon]:hidden truncate">
            Lumen LMS
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
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname.startsWith("/admin")}
                  >
                    <Link to="/admin">
                      <Shield className="shrink-0" />
                      <span>{t("admin.title")}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.courses")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mockCourses.map((course) => {
                const courseSubItems = getCourseSubItems(course.id);
                return (
                  <Collapsible
                    key={course.id}
                    asChild
                    defaultOpen={isInCourse(course.id)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={course.name}
                          isActive={isInCourse(course.id)}
                          onClick={() => handleCourseClick(course.id)}
                        >
                          <span className="font-medium shrink-0 w-4 text-center text-xs">
                            {course.shortName.slice(0, 2)}
                          </span>
                          <span className="truncate">{course.name}</span>
                          <ChevronRight className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {courseSubItems.map((item) => (
                            <SidebarMenuSubItem key={item.key}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={
                                  location.pathname ===
                                  `/courses/${course.id}/${item.key}`
                                }
                              >
                                <Link
                                  to={item.to}
                                  params={{ courseId: course.id }}
                                >
                                  <item.icon className="h-4 w-4" />
                                  <span>
                                    {t(`course.${item.key}` as const)}
                                  </span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
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
