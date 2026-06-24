import type {
  TouchGuestRequest,
  TouchGuestResponseBody,
} from "@/types/guest";

export const touchGuest = async (
  payload: TouchGuestRequest
): Promise<TouchGuestResponseBody> => {
  const response = await fetch("/api/guest/touch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
    keepalive: true,
  });

  const data = (await response.json().catch(() => ({}))) as TouchGuestResponseBody;

  if (!response.ok) {
    throw new Error(data.message || "Guest touch request failed.");
  }

  return data;
};
