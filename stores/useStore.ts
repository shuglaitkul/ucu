import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
    dark: boolean
    setTheme: () => void
    setDark: (value: boolean) => void;
    isAuthenticated: boolean;
    user: { username: string } | null;
    isHydrated: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const useStore = create<State>()(
    persist(
        (set, get) => ({
            dark: false,
            setTheme: () => set(state => ({ dark: !state.dark })),
            setDark: (value: boolean) => set({ dark: value }),
            isAuthenticated: false,
            user: null,
            isHydrated: false,
            login: async (username: string, password: string) => {
                const { validateUser } = await import('@/lib/auth');
                const isValid = validateUser(username, password);
                if (isValid) {
                    set({ isAuthenticated: true, user: { username } });
                    return true;
                }
                return false;
            },
            logout: () => set({ isAuthenticated: false, user: null }),
        }),
        {
            name: 'ucu-store',
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                dark: state.dark,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.isHydrated = true;
                }
            },
        }
    )
)
