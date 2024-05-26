import { create } from "zustand";

interface profileStoreState {
  profileDetails: any;
  setProfileDetails: Function;
}

const useProfileStore = create<profileStoreState>((set) => ({
  profileDetails: {},
  setProfileDetails: (userDetails: Object) =>
    set({ profileDetails: userDetails }),
}));

export default useProfileStore;
