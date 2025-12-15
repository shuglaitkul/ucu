import { useStore } from '@/stores/useStore';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import { useEffect, useState } from 'react';
import { Button } from './button';

export function ThemeIcon() {
    const setDark = useStore((s) => s.setDark);
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const current = resolvedTheme ?? theme;
        if (current) setDark(current === "dark");
    }, [theme, resolvedTheme, setDark]);

    if (!mounted) {
        return (
            <Button variant="logo" size="logo" aria-hidden>
                <Moon />
            </Button>
        );
    }

    const current = resolvedTheme ?? theme;
    const isDark = current === "dark";

    return (
        <Button
            variant="logo"
            size="logo"
            onClick={() => {
                const next = isDark ? "light" : "dark";
                setTheme(next);
                setDark(next === "dark");
            }}
        >
            {isDark ? <Sun /> : <Moon />}
        </Button>
    );
}

