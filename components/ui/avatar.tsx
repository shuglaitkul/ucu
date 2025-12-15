import { User } from "lucide-react";
import { Button } from "./button";

export function AvatarIcon() {
    return (
        <Button
            variant="logo"
            size="logo"
            aria-label="Профиль пользователя"
        >
            <User size={20} />
        </Button>
    )
}