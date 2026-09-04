import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * Desktop-only actions: theme + CTA.
 * Teaching point: isolated action bar, no mobile concerns.
 */
const DesktopActions = () => {
  return (
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
  );
};

export default DesktopActions;
