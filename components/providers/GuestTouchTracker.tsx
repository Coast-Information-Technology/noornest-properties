"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { touchGuest } from "@/lib/apiServices/guestService";
import safeConsole from "@/lib/console";
import type { TouchGuestRequest } from "@/types/guest";

const VISITOR_ID_KEY = "noornest_guest_visitor_id";
const TOUCH_SESSION_PREFIX = "noornest_guest_touch";

const excludedPathPrefixes = [
  "/api",
  "/dashboard",
  "/login",
  "/register",
  "/forgot-password",
  "/new-password",
  "/verify-email",
];

const shouldTrackPath = (pathname: string): boolean =>
  Boolean(pathname) &&
  !excludedPathPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

const getOrCreateVisitorId = (): string => {
  const existing = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;

  const visitorId =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
  return visitorId;
};

const getCampaignValue = (
  params: URLSearchParams,
  utmKey: string,
  fallbackKey: string
): string | undefined => {
  return params.get(utmKey) || params.get(fallbackKey) || undefined;
};

const buildTouchPayload = (
  visitorId: string,
  pathname: string
): TouchGuestRequest => {
  const search = window.location.search || "";
  const params = new URLSearchParams(search);
  const path = `${pathname}${search}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    visitorId,
    path,
    referrer: document.referrer || undefined,
    campaignSource: getCampaignValue(params, "utm_source", "campaignSource"),
    campaignMedium: getCampaignValue(params, "utm_medium", "campaignMedium"),
    campaignCampaign: getCampaignValue(
      params,
      "utm_campaign",
      "campaignCampaign"
    ),
    location: timeZone || undefined,
  };
};

export default function GuestTouchTracker({ enabled = true }: { enabled?: boolean }) {
  const pathname = usePathname() || "";
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!enabled || isLoading || user || !shouldTrackPath(pathname)) return;

    const visitorId = getOrCreateVisitorId();
    const payload = buildTouchPayload(visitorId, pathname);
    const sessionKey = `${TOUCH_SESSION_PREFIX}:${visitorId}:${payload.path}`;

    if (window.sessionStorage.getItem(sessionKey)) return;
    window.sessionStorage.setItem(sessionKey, "pending");

    touchGuest(payload)
      .then(() => {
        window.sessionStorage.setItem(sessionKey, "sent");
      })
      .catch((error: unknown) => {
        window.sessionStorage.removeItem(sessionKey);
        safeConsole.warn("Guest touch tracking failed", error);
      });
  }, [enabled, isLoading, pathname, user]);

  return null;
}
