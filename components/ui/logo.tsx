"use client";
import { useStore } from '@/stores/useStore';
import { useRouter } from 'next/navigation';

export function Logo() {
    const router = useRouter();
    const dark = useStore((s) => s.dark);
    const src = dark ? '/img/logo_white.svg' : '/img/logo.svg';

    return (
        <div className="flex flex-row items-center cursor-pointer gap-1" onClick={() => router.push('/')}>
            <img src={src} alt="UCU Logo" className="h-10 w-10" />
            <h1 className="logo text-foreground text-lg font-semibold">UCU</h1>
        </div>
    );
}