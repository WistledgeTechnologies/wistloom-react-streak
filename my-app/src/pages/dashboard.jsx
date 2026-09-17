import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {

  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  return (
    <div>
      {user?.name}
      {user?.email}
      <p>Welcome to the dashboard</p>
      <p>Logged In: {isLoggedIn ? "Yes" : "No"}</p>
      <button
        onClick={handleLogout}
        className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
      >
        <LogOut size={16} />
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
