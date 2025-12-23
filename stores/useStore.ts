import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
    dark: boolean
    setTheme: () => void
    setDark: (value: boolean) => void;
    isAuthenticated: boolean;
    user: { username: string; role?: string } | null;
    isHydrated: boolean;
    login: (username: string, password: string) => Promise<{ username: string; role?: string } | null>;
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
                try {
                    if (typeof window !== 'undefined') window.console.log(`[store] login: start username=${username}`);
                    else console.log(`[store] login: start username=${username}`);
                    const { validateUser, getUser } = await import('@/lib/auth');
                    const isValid = validateUser(username, password);
                    if (typeof window !== 'undefined') window.console.log(`[store] login: validateUser=${isValid}`);
                    else console.log(`[store] login: validateUser=${isValid}`);
                    if (isValid) {
                        const userObj = getUser(username);
                        set({ isAuthenticated: true, user: userObj });
                        if (typeof window !== 'undefined') window.console.log(`[store] login: success user=`, userObj);
                        else console.log(`[store] login: success user=`, userObj);
                        return userObj;
                    }
                    if (typeof window !== 'undefined') window.console.log(`[store] login: invalid credentials`);
                    else console.log(`[store] login: invalid credentials`);
                    return null;
                } catch (err) {
                    if (typeof window !== 'undefined') window.console.error('[store] login: error', err);
                    else console.error('[store] login: error', err);
                    return null;
                }
            },
            logout: () => {
                if (typeof window !== 'undefined') window.console.log('[store] logout called');
                else console.log('[store] logout called');
                set({ isAuthenticated: false, user: null });
            },
        }),
        {
            name: 'ucu-store',
            partialize: (state) => ({
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                dark: state.dark,
            }),
            onRehydrateStorage: () => (state) => {
                try {
                    if (typeof window !== 'undefined') window.console.log('[store] onRehydrateStorage start', !!state);
                    else console.log('[store] onRehydrateStorage start', !!state);
                } catch (e) {}
                if (state) {
                    state.isHydrated = true;
                    try {
                        if (typeof window !== 'undefined') window.console.log('[store] onRehydrateStorage: hydrated');
                        else console.log('[store] onRehydrateStorage: hydrated');
                    } catch (e) {}
                }
            },
        }
    )
)
