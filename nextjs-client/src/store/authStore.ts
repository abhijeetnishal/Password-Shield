import { create } from "zustand";

interface AuthStoreState {
  authToken: string;
  setAuthToken: Function;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  authToken: "",

  setAuthToken: (token: string) => set({ authToken: token }),
}));

export default useAuthStore;
