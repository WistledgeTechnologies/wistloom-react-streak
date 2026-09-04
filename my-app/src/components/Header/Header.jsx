import { useState } from "react";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import DesktopActions from "./DesktopActions";
import MobileNav from "./MobileNav";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-6 lg:gap-8">
          <Logo onNavigate={closeMenu} />
          <DesktopNav />
          <DesktopActions />
          <MobileNav isOpen={isOpen} onToggle={toggleMenu} onClose={closeMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
