import { NavLink, Link } from "react-router-dom";
import { navLinks } from "@/constants/navigation";

/**
 * Mobile dropdown navigation.
 * Teaching point: controlled component — parent decides isOpen.
 * Returns null when closed (no DOM), keeps Header clean.
 */
const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border bg-card">
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
  );
};

export default MobileMenu;
