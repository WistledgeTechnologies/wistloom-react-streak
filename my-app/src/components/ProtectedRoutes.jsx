import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = ( { user }) => {

    if(!user.isLoggedIn) {
        return <Navigate to="/signin" replace  />;
    }

    return <Outlet />
}

export default ProtectedRoutes