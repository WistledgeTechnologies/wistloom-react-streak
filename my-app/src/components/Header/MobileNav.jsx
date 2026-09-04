import { Menu, X, ChevronRight } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { navLinks } from "@/constants/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const MobileNav = ({ isOpen, onToggle, onClose, isLoggedIn }) => {
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

      <div
        className={`absolute top-full left-0 w-full md:hidden bg-card border-t border-border shadow-xl grid transition-all duration-300 ease-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={onClose}
                style={{ transitionDelay: isOpen ? `${index * 40}ms` : "0ms" }}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-6 py-4 text-[15px] font-medium border-b border-border transition-all duration-300 ${
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-card text-foreground hover:bg-background"
                  } ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`
                }
              >
                <span>{link.label}</span>
                <ChevronRight
                  size={18}
                  className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                />
              </NavLink>
            ))}

            {!isLoggedIn && (
              <div
                className={`grid grid-cols-2 gap-3 px-6 py-4 bg-card border-b border-border transition-all duration-300 ${
                  isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen ? `${navLinks.length * 40}ms` : "0ms",
                }}
              >
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-card transition-colors"
                >
                  Log in
                  <ChevronRight size={16} className="shrink-0 opacity-60" />
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 rounded-full border border-foreground bg-foreground px-4 py-3 text-sm font-medium text-background hover:opacity-90 transition-opacity"
                >
                  Sign up
                  <ChevronRight size={16} className="shrink-0 opacity-60" />
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <div
                className={`px-6 py-4 bg-background transition-all duration-300 ${
                  isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                }`}
                style={{
                  transitionDelay: isOpen
                    ? `${navLinks.length * 40}ms`
                    : "0ms",
                }}
              >
                <Link
                  to="/dashboard"
                  onClick={onClose}
                  className="flex w-full items-center justify-between rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <span>Dashboard</span>
                  <ChevronRight size={18} className="shrink-0 opacity-80" />
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
