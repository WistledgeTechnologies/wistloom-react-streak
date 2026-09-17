import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

const ProtectedRoutes = () => {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />
}

export default ProtectedRoutes