
"use client"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export function ForgetPassForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter()
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Восстановить аккаунт</CardTitle>
                    <CardDescription>
                        Введите ваш логин, чтобы мы могли сбросить пароль.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Логин</FieldLabel>
                                <Input
                                    id="login"
                                    type="login"
                                    placeholder="example"
                                    required
                                />
                            </Field>
                            <Field>
                                <Button
                                    onClick={() => router.push('/auth/forget-pass/reset')}
                                >Отправить
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => router.back()}
                                >
                                    Назад
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card >
        </div>
    )
}
