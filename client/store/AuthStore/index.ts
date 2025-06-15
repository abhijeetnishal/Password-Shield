import { create } from "zustand";

interface AuthStoreState {
  authToken: string;
  setAuthToken: Function;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  authToken: "",

  setAuthToken: (token: string) => set({ authToken: token }),
}));
