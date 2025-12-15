import { Navbar } from "@/components/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default AuthLayout;