import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <header className="mx-auto w-full max-w-8xl px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="logo" />
          <span className="font-bold text-foreground">Wistloom</span>
        </Link>
        <Link to="/" className="text-sm font-medium text-muted hover:text-foreground">
          ← Back to home
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;