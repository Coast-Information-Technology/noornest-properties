"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Role =
  | "property_owner"
  | "property_sourcer"
  | "agent"
  | "investor"
  | "service_provider"
  | "";

export type RegisterFlowState = {
  role: Role;
  email: string;
  userPublicId: string;
  emailVerified: boolean;
  acceptedPolicies: boolean;
};

type RegisterFlowActions = {
  setRole: (role: Role) => void;
  setEmail: (email: string) => void;
  setUserPublicId: (userPublicId: string) => void;
  markEmailVerified: () => void;
  setAcceptedPolicies: (accepted: boolean) => void;
  resetRegisterFlow: () => void;
};

export type RegisterFlowStore = RegisterFlowState & RegisterFlowActions;

const initialState: RegisterFlowState = {
  role: "",
  email: "",
  userPublicId: "",
  emailVerified: false,
  acceptedPolicies: false,
};

export const useRegisterFlowStore = create<RegisterFlowStore>()(
  persist(
    (set) => ({
      ...initialState,
      setRole: (role) => set({ role }),
      setEmail: (email) => set({ email }),
      setUserPublicId: (userPublicId) => set({ userPublicId }),
      markEmailVerified: () => set({ emailVerified: true }),
      setAcceptedPolicies: (accepted) => set({ acceptedPolicies: accepted }),
      resetRegisterFlow: () => set({ ...initialState }),
    }),
    {
      name: "register-flow-store",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : undefined
      ),
    }
  )
);
