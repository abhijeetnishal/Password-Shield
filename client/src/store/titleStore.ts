import create from 'zustand';

interface TitleState {
  title: string;
  setTitle: (title: string) => void;
}

const useTitleStore = create<TitleState>((set) => ({
  title: 'KeySafe',
  setTitle: (title) => set({ title }),
}));

export default useTitleStore;