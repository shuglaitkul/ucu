
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
                <FieldLabel htmlFor="email">Пароль</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Войти</Button>
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
