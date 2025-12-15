"use client"
import { cn } from "@/lib/utils"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export function RequestReceived({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter()

    useEffect(() => {
        const t = setTimeout(() => {
            router.replace('/auth')
        }, 3500)
        return () => clearTimeout(t)
    }, [router])
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Приняли запрос</CardTitle>
                    <CardDescription>
                        Ваши данные отправлены в техподдержку. Ожидайте обратную связь.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DotLottieReact
                        src="/sent_blue.lottie"
                        autoplay
                    />
                </CardContent>
            </Card >
        </div>
    )
}
