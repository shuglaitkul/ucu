import { ForgetPassForm } from "@/components/auth/forget-pass-form";

export default function ResetPage() {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-sm">
                <ForgetPassForm />
            </div>
        </div>
    )
}
