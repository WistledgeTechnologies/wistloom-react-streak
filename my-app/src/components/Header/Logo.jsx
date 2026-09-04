import { Link } from "react-router-dom";

const Logo = ({ onNavigate }) => {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      className="flex items-center gap-3 shrink-0"
    >
      <div className="logo" />
      <span className="text-lg font-bold tracking-tight text-foreground">
        MyApp
      </span>
    </Link>
  );
};

export default Logo;
