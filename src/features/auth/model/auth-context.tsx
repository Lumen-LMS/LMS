import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CourseEnrollment, CourseRole } from "@/entities/enrollment";
import {
  getMockEnrollmentsForUser,
  getUserCourseRole,
  hasMinCourseRole,
} from "@/entities/enrollment";
import type { SystemRole, User } from "@/entities/user";
import { mockUser } from "@/entities/user";
import { STORAGE_KEYS } from "@/shared/config/constants";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  enrollments: CourseEnrollment[];
  login: () => Promise<void>;
  logout: () => void;
  getCourseRole: (courseId: string) => CourseRole | null;
  hasMinCourseRole: (courseId: string, requiredRole: CourseRole) => boolean;
  setSystemRole: (role: SystemRole) => void;
  setCourseRole: (courseId: string, role: CourseRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.AUTH);
    const storedEnrollments = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (storedEnrollments) {
          setEnrollments(JSON.parse(storedEnrollments));
        }
      } catch {
        localStorage.removeItem(STORAGE_KEYS.AUTH);
        localStorage.removeItem(STORAGE_KEYS.ENROLLMENTS);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userEnrollments = getMockEnrollmentsForUser(mockUser.id);

    setUser(mockUser);
    setEnrollments(userEnrollments);

    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(mockUser));
    localStorage.setItem(
      STORAGE_KEYS.ENROLLMENTS,
      JSON.stringify(userEnrollments),
    );
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setEnrollments([]);

    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.ENROLLMENTS);

    window.location.href = "/login";
  }, []);

  const getCourseRoleFn = useCallback(
    (courseId: string): CourseRole | null => {
      return getUserCourseRole(enrollments, courseId);
    },
    [enrollments],
  );

  const hasMinCourseRoleFn = useCallback(
    (courseId: string, requiredRole: CourseRole): boolean => {
      const userRole = getUserCourseRole(enrollments, courseId);

      return hasMinCourseRole(userRole, requiredRole);
    },
    [enrollments],
  );

  const isAdmin = useMemo(() => user?.systemRole === "admin", [user]);

  const setSystemRole = useCallback(
    (role: SystemRole) => {
      if (!user) return;
      const updatedUser = { ...user, systemRole: role };

      setUser(updatedUser);

      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(updatedUser));
    },
    [user],
  );

  const setCourseRole = useCallback(
    (courseId: string, role: CourseRole) => {
      const updatedEnrollments = enrollments.map((e) =>
        e.courseId === courseId ? { ...e, role } : e,
      );

      setEnrollments(updatedEnrollments);

      localStorage.setItem(
        STORAGE_KEYS.ENROLLMENTS,
        JSON.stringify(updatedEnrollments),
      );
    },
    [enrollments],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAdmin,
        enrollments,
        login,
        logout,
        getCourseRole: getCourseRoleFn,
        hasMinCourseRole: hasMinCourseRoleFn,
        setSystemRole,
        setCourseRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
