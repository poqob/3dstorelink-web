import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  business: { id: string; email: string; companyName: string; name?: string; isAdmin?: boolean; plan?: string; profilePictureUrl?: string; totalStorageBytes?: number; createdAt?: string; totalModels?: number; totalViews?: number; subscriptionStartDate?: string; subscriptionEndDate?: string; modelLimit?: number; features?: any; } | null;
  setAuth: (token: string, business: AuthState['business']) => void;
  updateBusiness: (business: AuthState['business']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      business: null,
      setAuth: (token, business) => set({ token, business }),
      updateBusiness: (business) => set({ business }),
      logout: () => set({ token: null, business: null }),
    }),
    { name: 'auth-storage' },
  ),
);
