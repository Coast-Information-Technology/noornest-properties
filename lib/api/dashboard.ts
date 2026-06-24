/**
 * Dashboard API service stubs.
 *
 * This module intentionally does not fake successful network behavior.
 * Until the real dashboard backend contracts are wired, these functions fail
 * fast with typed "not implemented" errors so production code cannot
 * accidentally rely on placeholder data paths.
 */

export interface DashboardApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class DashboardApiNotImplementedError extends Error {
  readonly status = 501;
  readonly success = false;

  constructor(feature: string) {
    super(`${feature} is not implemented yet.`);
    this.name = "DashboardApiNotImplementedError";
  }
}

const notImplemented = (feature: string): never => {
  throw new DashboardApiNotImplementedError(feature);
};

// ==================== CLIENT DASHBOARD APIs ====================

export const clientDashboardApi = {
  // Get saved properties
  getSavedProperties: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResponse<unknown>> => {
    return notImplemented("clientDashboardApi.getSavedProperties");
  },

  // Save/unsave property
  toggleSaveProperty: async (propertyId: number): Promise<DashboardApiResponse<boolean>> => {
    void propertyId;
    return notImplemented("clientDashboardApi.toggleSaveProperty");
  },

  // Get bookings
  getBookings: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
  }): Promise<PaginatedResponse<unknown>> => {
    return notImplemented("clientDashboardApi.getBookings");
  },

  // Create booking
  createBooking: async (data: {
    propertyId: number;
    date: string;
    time: string;
    type: "in-person" | "virtual";
    notes?: string;
  }): Promise<DashboardApiResponse<unknown>> => {
    void data;
    return notImplemented("clientDashboardApi.createBooking");
  },

  // Get payments
  getPayments: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<unknown>> => {
    return notImplemented("clientDashboardApi.getPayments");
  },

  // Get BMV analyses
  getBMVAnalyses: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<unknown>> => {
    return notImplemented("clientDashboardApi.getBMVAnalyses");
  },
};

// ==================== AGENT DASHBOARD APIs ====================

export const agentDashboardApi = {
  // Get listings
  getListings: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse<unknown>> => {
    return notImplemented("agentDashboardApi.getListings");
  },

  // Create listing
  createListing: async (data: unknown): Promise<DashboardApiResponse<unknown>> => {
    void data;
    return notImplemented("agentDashboardApi.createListing");
  },

  // Update listing
  updateListing: async (
    id: number,
    data: unknown
  ): Promise<DashboardApiResponse<unknown>> => {
    void id;
    void data;
    return notImplemented("agentDashboardApi.updateListing");
  },

  // Delete listing
  deleteListing: async (id: number): Promise<DashboardApiResponse<boolean>> => {
    void id;
    return notImplemented("agentDashboardApi.deleteListing");
  },

  // Get clients
  getClients: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<PaginatedResponse<any>> => {
    return notImplemented("agentDashboardApi.getClients");
  },

  // Get analytics
  getAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
    period?: string;
  }): Promise<DashboardApiResponse<unknown>> => {
    return notImplemented("agentDashboardApi.getAnalytics");
  },

  // Generate report
  generateReport: async (data: {
    type: string;
    period: string;
    format?: string;
  }): Promise<DashboardApiResponse<unknown>> => {
    void data;
    return notImplemented("agentDashboardApi.generateReport");
  },
};

// ==================== INVESTOR DASHBOARD APIs ====================

export const investorDashboardApi = {
  // Get portfolio
  getPortfolio: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<any>> => {
    return notImplemented("investorDashboardApi.getPortfolio");
  },

  // Get opportunities
  getOpportunities: async (params?: {
    page?: number;
    limit?: number;
    riskLevel?: string;
    minROI?: number;
  }): Promise<PaginatedResponse<any>> => {
    return notImplemented("investorDashboardApi.getOpportunities");
  },

  // Get payouts
  getPayouts: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<any>> => {
    return notImplemented("investorDashboardApi.getPayouts");
  },

  // Get analytics
  getAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
    period?: string;
  }): Promise<DashboardApiResponse<unknown>> => {
    return notImplemented("investorDashboardApi.getAnalytics");
  },
};

// ==================== SHARED APIs ====================

export const sharedDashboardApi = {
  // Get dashboard stats
  getStats: async (): Promise<DashboardApiResponse<unknown>> => {
    return notImplemented("sharedDashboardApi.getStats");
  },
};

