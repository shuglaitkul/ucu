
"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useStore } from "@/stores/useStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"


const loginSchema = z.object({
  username: z.string().min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useStore()
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setError("")
    console.log('[login-form] onSubmit start', data.username)
    try {
      const user = await login(data.username, data.password)
      console.log('[login-form] login returned', user)
      if (user) {
        const role = user.role
        console.log('[login-form] redirecting for role=', role)
        switch (role) {
          case "planner":
            router.push("/planner")
            break
          case "checker":
            router.push("/checker")
            break
          case "crane":
            router.push("/crane")
            break
          default:
            router.push("/auth")
        }
      } else {
        console.warn('[login-form] invalid credentials')
        setError("Неверный логин или пароль")
      }
    } catch (err) {
      console.error("[login-form] Login error:", err)
      setError("Произошла ошибка при входе")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Добро пожаловать в систему</CardTitle>
          <CardDescription>
            UCU — Универсальная система управления сухим портом
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Логин</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="NameSurname"
                  {...register("username")}
                  required
                />
                {errors.username && (
                  <p className="text-sm text-red-600">{errors.username.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Пароль</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </Field>
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Вход..." : "Войти"}
                </Button>
              </Field>
              <FieldDescription className="px-6 text-center">
                <a href="/auth/forget-pass">Забыли пароль?</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card >
      <p className="text-sm text-muted-foreground text-center">
        Авторизуйтесь чтобы продолжить работу в системе.
      </p>
    </div>
  )
}
