import { NavLink } from "react-router-dom";
import { navLinks } from "@/constants/navigation";

/**
 * Desktop-only navigation.
 * Teaching point: presentational component, reads from shared constant.
 * Hidden on mobile (md:flex), no state.
 */
const DesktopNav = () => {
  return (
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
  );
};

export default DesktopNav;
