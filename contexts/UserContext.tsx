"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserRole } from "@/types";
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
  if (value === "agent" || value === "investor" || value === "client" || value === "guest") {
    return value as UserRole;
  }
  return "client";
};

const mapBackendUser = (rawUser: any): User => {
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
        const rawUser = response?.data?.data || response?.data;
        const mappedUser = mapBackendUser(rawUser);
        setUser(mappedUser);
        localStorage.setItem("currentUser", JSON.stringify(mappedUser));
      } catch (error) {
        safeConsole.error("Error restoring session:", error);
        localStorage.removeItem("currentUser");
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
      if (loginResponse?.data?.success === false) {
        return {
          success: false,
          message: loginResponse?.data?.message || "Invalid email or password",
        };
      }

      const payload = loginResponse?.data?.data || loginResponse?.data || {};

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
        rawUser = meResponse?.data?.data || meResponse?.data;
      }

      if (!rawUser) {
        return { success: false, message: "Login succeeded but user profile was not returned." };
      }

      const mappedUser = mapBackendUser(rawUser);
      setUser(mappedUser);
      localStorage.setItem("currentUser", JSON.stringify(mappedUser));

      return { success: true };
    } catch (error: any) {
      return { success: false, message: error?.message || "Invalid email or password" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
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

