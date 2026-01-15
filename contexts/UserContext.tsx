"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserRole } from "@/types";
import safeConsole from "@/lib/console";

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

// Dummy user credentials for each role
// Passwords are stored in environment variables for security
const DUMMY_USERS = [
  {
    id: "3",
    name: "Agent Smith",
    email: "agent@noornest.com",
    password: process.env.NEXT_PUBLIC_DUMMY_AGENT_PASSWORD || "",
    role: "agent" as UserRole,
    avatar: "/avatars/agent.jpg",
  },
  {
    id: "4",
    name: "Investor Johnson",
    email: "investor@noornest.com",
    password: process.env.NEXT_PUBLIC_DUMMY_INVESTOR_PASSWORD || "",
    role: "investor" as UserRole,
    avatar: "/avatars/investor.jpg",
  },
  {
    id: "5",
    name: "Client Williams",
    email: "client@noornest.com",
    password: process.env.NEXT_PUBLIC_DUMMY_CLIENT_PASSWORD || "",
    role: "client" as UserRole,
    avatar: "/avatars/client.jpg",
  },
  {
    id: "6",
    name: "Guest User",
    email: "guest@noornest.com",
    password: process.env.NEXT_PUBLIC_DUMMY_GUEST_PASSWORD || "",
    role: "guest" as UserRole,
    avatar: "/avatars/guest.jpg",
  },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        safeConsole.error("Error parsing stored user:", error);
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = DUMMY_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      return { success: true };
    }

    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
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

