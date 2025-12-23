"use client"

import { LoginForm } from "@/components/auth/login-form"
import { useStore } from '@/stores/useStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
    const { isAuthenticated, isHydrated, user } = useStore()
    const router = useRouter()

    useEffect(() => {
        console.log('[auth page] effect runner', { isHydrated, isAuthenticated, user })
        if (isHydrated && isAuthenticated) {
            const role = user?.role
            console.log('[auth page] redirect for role=', role)
            if (role === 'planner') router.push('/planner')
            else if (role === 'checker') router.push('/checker')
            else if (role === 'crane') router.push('/crane')
            else router.push('/planner')
        }
    }, [isHydrated, isAuthenticated, router, user])

    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}
