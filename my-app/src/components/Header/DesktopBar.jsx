import { NavLink, Link } from "react-router-dom";
import { navLinks } from "@/constants/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const DesktopBar = () => {
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

      <div className="hidden md:flex items-center gap-4 shrink-0">
        <div className="h-6 w-px bg-border hidden lg:block" />
        <ThemeToggle />
        <Link
          to="/dashboard"
          className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
        >
          Dashboard
        </Link>
      </div>
    </>
  );
};

export default DesktopBar;
