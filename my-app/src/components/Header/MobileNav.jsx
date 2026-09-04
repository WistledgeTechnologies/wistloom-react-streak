import { Menu, X, ChevronRight } from "lucide-react";
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
        <div className="absolute top-full left-0 w-full md:hidden bg-card border-t border-border shadow-xl overflow-hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-6 py-4 text-[15px] font-medium border-b border-border transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-card text-foreground hover:bg-background"
                  }`
                }
              >
                <span>{link.label}</span>
                <ChevronRight
                  size={18}
                  className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
                />
              </NavLink>
            ))}

            <div className="px-6 py-4 bg-background">
              <Link
                to="/dashboard"
                onClick={onClose}
                className="flex w-full items-center justify-between rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                <span>Dashboard</span>
                <ChevronRight size={18} className="shrink-0 opacity-80" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
