"use client"

import { LoginForm } from "@/components/auth/login-form"
import { useStore } from '@/stores/useStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
    const { isAuthenticated, isHydrated } = useStore()
    const router = useRouter()

    useEffect(() => {
        if (isHydrated && isAuthenticated) {
            router.push('/main')
        }
    }, [isHydrated, isAuthenticated, router])

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}
