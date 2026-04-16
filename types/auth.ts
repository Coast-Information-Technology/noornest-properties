export type CanonicalUserRole =
  | "super_admin"
  | "admin"
  | "property_owner"
  | "property_sourcer"
  | "service_provider"
  | "agent"
  | "investor"
  | "guest";

export interface BackendUser {
  id?: string;
  publicId?: string;
  userPublicId?: string;
  email?: string;
  firstName?: string;
  first_name?: string;
  lastName?: string;
  last_name?: string;
  name?: string;
  role?: string;
  avatar?: string;
}

export interface RegisterResponseData {
  userPublicId: string;
  role: CanonicalUserRole | string;
}

export interface RegisterResponseBody {
  success: boolean;
  message: string;
  data: RegisterResponseData;
  error: string | null;
}

export interface VerifyEmailResponseBody {
  success: boolean;
  message: string;
  data?: {
    userPublicId?: string;
    verified?: boolean;
  } | null;
  error?: string | null;
}

export interface LoginResponsePayload {
  access_token?: string;
  accessToken?: string;
  refresh_token?: string;
  refreshToken?: string;
  token?: string;
  sessionId?: string;
  session_id?: string;
  user?: BackendUser;
  profile?: BackendUser;
}

export interface LoginResponseBody {
  success?: boolean;
  message?: string;
  data?: LoginResponsePayload;
}

export interface CurrentUserResponseBody {
  success?: boolean;
  message?: string;
  data?: BackendUser;
}

export interface RefreshTokenResponseBody {
  success?: boolean;
  message?: string;
  data?: {
    access_token?: string;
    accessToken?: string;
    refresh_token?: string;
    refreshToken?: string;
    sessionId?: string;
    session_id?: string;
  };
}

export interface LogoutResponseBody {
  success?: boolean;
  message?: string;
  data?: {
    loggedOut?: boolean;
  } | null;
}

