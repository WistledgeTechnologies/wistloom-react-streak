import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout";

import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Services from "@/pages/services";
import Pricing from "@/pages/pricing";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import ProtectedRoutes from "@//components/ProtectedRoutes";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../pages/auth/sign-up";
import SignIn from "../pages/auth/sign-in";


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "pricing",
            element: <Pricing />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
<<<<<<< HEAD
            path: "login",
            element: <SignIn />,
          },
          {
            path: "sign-in",
            element: <SignIn />,
          },
          {
=======
>>>>>>> 1aa0f2299e182add3a7752134ed875409dda4f40
            path: "signup",
            element: <SignUp />,
          },
          {
<<<<<<< HEAD
            path: "sign-up",
            element: <SignUp />,
=======
            path: "signin",
            element: <SignIn />,
>>>>>>> 1aa0f2299e182add3a7752134ed875409dda4f40
          },
        ],
      },
      {
<<<<<<< HEAD
        element: <ProtectedRoutes user={user}/>,
=======
        element: <ProtectedRoutes />,
>>>>>>> 1aa0f2299e182add3a7752134ed875409dda4f40
        children: [
            {
            element: <DashboardLayout />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />,
              },
            ],
        },
        ]
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
