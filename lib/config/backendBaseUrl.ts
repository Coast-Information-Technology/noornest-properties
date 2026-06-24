export function getBackendBaseUrl(): string {
  const raw =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "";

  if (!raw || typeof raw !== "string") {
    throw new Error("Missing API base URL configuration.");
  }

  // Trim whitespace and remove trailing slash to avoid double-slash URLs.
  const trimmed = raw.trim();
  const withoutTrailingSlash = trimmed.replace(/\/+$/, "");

  try {
    const url = new URL(withoutTrailingSlash);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error(
        `Invalid API base URL configuration. URL protocol must be http or https: ${raw}`
      );
    }
  } catch {
    throw new Error(`Invalid API base URL configuration: ${raw}`);
  }

  return withoutTrailingSlash;
}

