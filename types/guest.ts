export interface TouchGuestRequest {
  visitorId: string;
  path: string;
  referrer?: string;
  campaignSource?: string;
  campaignMedium?: string;
  campaignCampaign?: string;
  location?: string;
}

export interface TouchGuestResponseData {
  visitorId: string;
  guestPublicId?: string;
  firstSeenAt?: string;
  lastSeenAt?: string;
}

export interface TouchGuestResponseBody {
  success?: boolean;
  message?: string;
  data?: TouchGuestResponseData;
  error?: string | null;
  meta?: {
    requestId?: string;
    timestamp?: string;
    path?: string;
    statusCode?: number;
  };
}
