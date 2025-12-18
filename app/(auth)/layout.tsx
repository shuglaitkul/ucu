import { Navbar } from "@/components/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Navbar />
      <main className="absolute top-0 left-0 w-full h-full pt-16">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
