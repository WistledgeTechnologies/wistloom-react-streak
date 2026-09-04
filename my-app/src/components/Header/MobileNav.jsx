import { Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { navLinks } from "@/constants/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const MobileNav = ({ isOpen, onToggle, onClose }) => {
  return (
    <>
      <div className="flex md:hidden items-center gap-2 ml-auto">
        <ThemeToggle />
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={onToggle}
          className="inline-flex items-center justify-center rounded-full h-9 w-9 text-foreground hover:bg-background border border-border transition-colors shrink-0"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full md:hidden border-t border-border bg-card shadow-lg">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground hover:bg-background"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-3 border-t border-border pt-4">
              <Link
                to="/dashboard"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                Dashboard
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
