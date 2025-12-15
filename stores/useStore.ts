import { create } from 'zustand';

interface State {
    dark: boolean
    setTheme: () => void
    setDark: (value: boolean) => void;
}

export const useStore = create<State>((set) => ({
    dark: false,
    setTheme: () => set(state => ({ dark: !state.dark })),
    setDark: (value: boolean) => set({ dark: value }),
}))
