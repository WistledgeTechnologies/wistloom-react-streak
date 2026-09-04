import { Menu, X } from "lucide-react";

/**
 * Mobile hamburger button only.
 * Teaching point: dumb component — receives isOpen + onToggle, no nav knowledge.
 */
const MobileToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onToggle}
      className="inline-flex items-center justify-center rounded-full h-9 w-9 text-foreground hover:bg-background border border-border transition-colors shrink-0"
    >
      {isOpen ? <X size={18} /> : <Menu size={18} />}
    </button>
  );
};

export default MobileToggle;
