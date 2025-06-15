import { create } from "zustand";

interface ProfileStoreState {
  profileDetails: any;
  setProfileDetails: Function;
}

export const useProfileStore = create<ProfileStoreState>((set) => ({
  profileDetails: {},
  setProfileDetails: (userDetails: Object) =>
    set({ profileDetails: userDetails }),
}));
