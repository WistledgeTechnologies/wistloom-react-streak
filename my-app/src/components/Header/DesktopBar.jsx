import { NavLink, Link } from "react-router-dom";
import { navLinks } from "@/constants/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const DesktopBar = ({ isLoggedIn }) => {
  return (
    <>
      <nav className="hidden md:flex flex-1 items-center justify-center gap-1.5">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted hover:text-foreground hover:bg-background"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-3 shrink-0">
        <div className="h-6 w-px bg-border hidden lg:block" />
        <ThemeToggle />
        {isLoggedIn ? (
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-full border border-blue-600 bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground hover:bg-card transition-colors whitespace-nowrap"
          >
            Log in
          </Link>
        )}
        {!isLoggedIn && (
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-full border border-foreground bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Sign up
          </Link>
        )}
      </div>
    </>
  );
};

export default DesktopBar;
