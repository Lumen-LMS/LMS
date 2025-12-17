import { createRootRoute, createRoute, redirect } from "@tanstack/react-router";

import { AdminAuditPage } from "@/pages/admin/audit-page";
import { AdminCourseCreatePage } from "@/pages/admin/course-create-page";
import { AdminCourseEditPage } from "@/pages/admin/course-edit-page";
import { AdminCoursesPage } from "@/pages/admin/courses-page";
import { AdminDashboardPage } from "@/pages/admin/dashboard-page";
import { AdminUserCreatePage } from "@/pages/admin/user-create-page";
import { AdminUserEditPage } from "@/pages/admin/user-edit-page";
import { AdminUsersPage } from "@/pages/admin/users-page";

import { LoginPage } from "@/pages/auth/login-page";

import { CourseAboutPage } from "@/pages/course/about-page";
import { CourseAssignmentsPage } from "@/pages/course/assignments-page";
import { CourseFeedbackPage } from "@/pages/course/feedback-page";
import { CourseGradesPage } from "@/pages/course/grades-page";
import { CourseMaterialsPage } from "@/pages/course/materials-page";
import { CourseMembersPage } from "@/pages/course/members-page";
import { CourseReviewsPage } from "@/pages/course/reviews-page";
import { CourseSettingsPage } from "@/pages/course/settings-page";

import { HomePage } from "@/pages/home/home-page";
import { ProfilePage } from "@/pages/profile/profile-page";
import { STORAGE_KEYS } from "@/shared/config/constants";

import { AdminLayout } from "../layouts/admin-layout";
import { AuthLayout } from "../layouts/auth-layout";
import { CourseLayout } from "../layouts/course-layout";
import { MainLayout } from "../layouts/main-layout";
import { adminGuard, authGuard } from "./guards";

export const rootRoute = createRootRoute();

// Index route - redirect to /home or /login
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const stored = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (stored) {
      throw redirect({ to: "/home" });
    }

    throw redirect({ to: "/login" });
  },
});

const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth-layout",
  component: AuthLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/login",
  component: LoginPage,
});

const protectedLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected-layout",
  component: MainLayout,
  beforeLoad: authGuard,
});

const homeRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/home",
  component: HomePage,
});

const profileRoute = createRoute({
  getParentRoute: () => protectedLayoutRoute,
  path: "/profile",
  component: ProfilePage,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
  beforeLoad: adminGuard,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  component: AdminDashboardPage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/users",
  component: AdminUsersPage,
});

const adminUserCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/users/new",
  component: AdminUserCreatePage,
});

const adminUserEditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/users/$userId",
  component: AdminUserEditPage,
});

const adminCoursesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/courses",
  component: AdminCoursesPage,
});

const adminCourseCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/courses/new",
  component: AdminCourseCreatePage,
});

const adminCourseEditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/courses/$courseId",
  component: AdminCourseEditPage,
});

const adminAuditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/audit",
  component: AdminAuditPage,
});

const courseLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/courses/$courseId",
  component: CourseLayout,
  beforeLoad: authGuard,
});

const courseIndexRoute = createRoute({
  getParentRoute: () => courseLayoutRoute,
  path: "/",
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/courses/$courseId/about", params });
  },
});

const courseAboutRoute = createRoute({
  getParentRoute: () => courseLayoutRoute,
  path: "/about",
  component: CourseAboutPage,
});

const courseGradesRoute = createRoute({
  getParentRoute: () => courseLayoutRoute,
  path: "/grades",
  component: CourseGradesPage,
});

const courseReviewsRoute = createRoute({
  getParentRoute: () => courseLayoutRoute,
  path: "/reviews",
  component: CourseReviewsPage,
});

const courseMaterialsRoute = createRoute({
  getParentRoute: () => courseLayoutRoute,
  path: "/materials",
  component: CourseMaterialsPage,
});

const courseFeedbackRoute = createRoute({
  getParentRoute: () => courseLayoutRoute,
  path: "/feedback",
  component: CourseFeedbackPage,
});

const courseMembersRoute = createRoute({
  getParentRoute: () => courseLayoutRoute,
  path: "/members",
  component: CourseMembersPage,
});

const courseAssignmentsRoute = createRoute({
  getParentRoute: () => courseLayoutRoute,
  path: "/assignments",
  component: CourseAssignmentsPage,
});

const courseSettingsRoute = createRoute({
  getParentRoute: () => courseLayoutRoute,
  path: "/settings",
  component: CourseSettingsPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  authLayoutRoute.addChildren([loginRoute]),
  protectedLayoutRoute.addChildren([homeRoute, profileRoute]),
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminUsersRoute,
    adminUserCreateRoute,
    adminUserEditRoute,
    adminCoursesRoute,
    adminCourseCreateRoute,
    adminCourseEditRoute,
    adminAuditRoute,
  ]),
  courseLayoutRoute.addChildren([
    courseIndexRoute,
    courseAboutRoute,
    courseGradesRoute,
    courseReviewsRoute,
    courseMaterialsRoute,
    courseFeedbackRoute,
    courseMembersRoute,
    courseAssignmentsRoute,
    courseSettingsRoute,
  ]),
]);
