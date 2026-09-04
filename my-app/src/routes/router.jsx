import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Services from "@/pages/services";
import Pricing from "@/pages/pricing";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/NotFound";
import ProtectedRoutes from "@//components/ProtectedRoutes";
import user from "@//data/userData";


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
        element: <ProtectedRoutes user={user}/>,
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
