import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import DesktopActions from "./DesktopActions";
import MobileToggle from "./MobileToggle";
import MobileMenu from "./MobileMenu";

/**
 * Header — orchestrator only.
 * Holds mobile menu state and composes focused sub-components.
 * Teaching points:
 *  - Single Responsibility: Header manages state, children handle UI.
 *  - Division of concerns: Desktop vs Mobile split into separate files.
 *  - No navLinks here — lives in @/constants/navigation (shared).
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-6 lg:gap-8">
          <Logo onNavigate={closeMenu} />

          {/* Desktop: centered nav + actions — hidden on mobile */}
          <DesktopNav />
          <DesktopActions />

          {/* Mobile: only toggle + theme — nav lives in MobileMenu */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <ThemeToggle />
            <MobileToggle isOpen={isOpen} onToggle={toggleMenu} />
          </div>
        </div>
      </div>

      {/* Mobile dropdown — fully isolated */}
      <MobileMenu isOpen={isOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;
