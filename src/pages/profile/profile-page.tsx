import { Building, Github, Hash, Mail, Shield, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { mockCourses } from "@/entities/course";
import type { CourseRole } from "@/entities/enrollment";
import {
  COURSE_ROLE_HIERARCHY,
  getCourseRoleLabel,
} from "@/entities/enrollment";
import type { SystemRole } from "@/entities/user";
import { UserAvatar } from "@/entities/user";
import { useAuth } from "@/features/auth";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const SYSTEM_ROLES: SystemRole[] = ["admin", "user"];
const COURSE_ROLES: CourseRole[] = Object.keys(
  COURSE_ROLE_HIERARCHY,
) as CourseRole[];

export function ProfilePage() {
  const { t } = useTranslation();
  const { user, setSystemRole, setCourseRole, getCourseRole } = useAuth();

  if (!user) return null;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">{t("profile.title")}</h1>
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.personalInfo")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6">
            <UserAvatar user={user} size="lg" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                {user.lastName} {user.firstName} {user.middleName}
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              {user.githubUsername && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Github className="h-4 w-4" />
                  <a
                    href={`https://github.com/${user.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    @{user.githubUsername}
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("profile.academicInfo")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("profile.group")}
                </p>
                <p className="font-medium">{user.group}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Hash className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("profile.course")}
                </p>
                <p className="font-medium">{user.course}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:col-span-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("profile.faculty")}
                </p>
                <p className="font-medium">{user.faculty}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Hash className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("profile.isuId")}
                </p>
                <p className="font-medium">{user.isuId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-yellow-500/50 bg-yellow-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
              <Shield className="h-5 w-5" />
              {t("profile.devRoleSwitcher")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>{t("profile.systemRole")}</Label>
              <div className="flex items-center gap-3">
                <Select
                  value={user.systemRole}
                  onValueChange={(value) => setSystemRole(value as SystemRole)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SYSTEM_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {t(`roles.${role}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge
                  variant={
                    user.systemRole === "admin" ? "destructive" : "secondary"
                  }
                >
                  {t(`roles.${user.systemRole}`)}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <Label>{t("profile.courseRoles")}</Label>

              <div className="space-y-2">
                {mockCourses.map((course) => {
                  const currentRole = getCourseRole(course.id);

                  return (
                    <div
                      key={course.id}
                      className="flex items-center justify-between gap-3 p-2 rounded-md bg-muted/50"
                    >
                      <span className="text-sm font-medium truncate flex-1">
                        {course.name}
                      </span>
                      <Select
                        value={currentRole ?? "student"}
                        onValueChange={(value) =>
                          setCourseRole(course.id, value as CourseRole)
                        }
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {COURSE_ROLES.map((role) => (
                            <SelectItem key={role} value={role}>
                              {getCourseRoleLabel(role)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              {t("profile.devWarning")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
