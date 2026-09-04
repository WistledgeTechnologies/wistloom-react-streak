import { useState } from "react";
import Logo from "./Logo";
import DesktopBar from "./DesktopBar";
import MobileNav from "./MobileNav";
import user from "@/data/userData";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = user?.isLoggedIn ?? false;

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto max-w-8xl px-6 lg:px-8">
        <div className="flex h-16 items-center gap-6 lg:gap-8">
          <Logo onNavigate={closeMenu} />
          <DesktopBar isLoggedIn={isLoggedIn} />
          <MobileNav
            isOpen={isOpen}
            onToggle={toggleMenu}
            onClose={closeMenu}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
