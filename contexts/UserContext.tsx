"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserRole } from "@/types";
import { BackendUser, CurrentUserResponseBody, LoginResponseBody } from "@/types/auth";
import safeConsole from "@/lib/console";
import { getTokenFromCookies, saveRefreshTokenToCookies, saveSessionIdToCookies, saveTokenToCookies } from "@/lib/cookies";
import { getUserMe, loginUser, logoutUser } from "@/lib/apiServices/authServices";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const normalizeUserRole = (role: unknown): UserRole => {
  const value = String(role || "").toLowerCase();
  if (
    value === "super_admin" ||
    value === "admin" ||
    value === "property_owner" ||
    value === "property_sourcer" ||
    value === "service_provider" ||
    value === "agent" ||
    value === "investor" ||
    value === "guest"
  ) {
    return value as UserRole;
  }

  // Legacy alias support until backend/frontend are fully aligned.
  if (value === "client") {
    return "property_owner";
  }

  safeConsole.warn("Unknown backend role received; defaulting to guest", value);
  return "guest";
};

const mapBackendUser = (rawUser: BackendUser): User => {
  const firstName = rawUser?.firstName || rawUser?.first_name || "";
  const lastName = rawUser?.lastName || rawUser?.last_name || "";
  const fullName = rawUser?.name || `${firstName} ${lastName}`.trim();

  return {
    id: String(rawUser?.id || rawUser?.userPublicId || rawUser?.publicId || ""),
    name: fullName || "User",
    email: rawUser?.email || "",
    role: normalizeUserRole(rawUser?.role),
    avatar: rawUser?.avatar,
  };
};

const unwrapCurrentUser = (
  responseBody: CurrentUserResponseBody | BackendUser | undefined
): BackendUser | undefined => {
  if (!responseBody) return undefined;
  if ("data" in responseBody && responseBody.data) {
    return responseBody.data;
  }
  return responseBody as BackendUser;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = getTokenFromCookies();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getUserMe(token);
        const rawUser = unwrapCurrentUser(response?.data);
        if (!rawUser) {
          setUser(null);
          return;
        }
        const mappedUser = mapBackendUser(rawUser);
        setUser(mappedUser);
      } catch (error) {
        safeConsole.error("Error restoring session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrapAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const loginResponse = await loginUser({ email, password });
      const responseBody = loginResponse?.data as LoginResponseBody;
      if (responseBody?.success === false) {
        return {
          success: false,
          message: responseBody?.message || "Invalid email or password",
        };
      }

      const payload = responseBody?.data || {};

      const accessToken =
        payload?.access_token || payload?.accessToken || payload?.token;
      const refreshToken =
        payload?.refresh_token || payload?.refreshToken;
      const sessionId = payload?.sessionId || payload?.session_id;

      if (accessToken) {
        saveTokenToCookies(accessToken);
      }
      if (refreshToken) {
        saveRefreshTokenToCookies(refreshToken);
      }
      if (sessionId) {
        saveSessionIdToCookies(sessionId);
      }

      let rawUser = payload?.user || payload?.profile;
      if (!rawUser && accessToken) {
        const meResponse = await getUserMe(accessToken);
        rawUser = unwrapCurrentUser(meResponse?.data);
      }

      if (!rawUser) {
        return { success: false, message: "Login succeeded but user profile was not returned." };
      }

      const mappedUser = mapBackendUser(rawUser);
      setUser(mappedUser);

      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Invalid email or password",
      };
    }
  };

  const logout = () => {
    setUser(null);
    void logoutUser();
  };

  return (
    <UserContext.Provider value={{ user, isLoading, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

