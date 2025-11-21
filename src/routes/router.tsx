import { createBrowserRouter } from "react-router";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ErrorPage from "@/pages/ErrorPage";
import CompanyProfile from "@/pages/complete-profile/CompanyProfile";
import CandidateProfile from "@/pages/complete-profile/CandidateProfile";
import CompanyDashboardLayout from "@/layout/CompanyDashboardLayout";
import CompanyDashboard from "@/pages/company-dashboard/CompanyDashboard";
import CandidateSearch from "@/pages/company-dashboard/SearchCandidate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/complete-profile/company",
    element: <CompanyProfile />,
  },
  {
    path: "/complete-profile/candidate",
    element: <CandidateProfile />,
  },
  {
    path: "/company/dashboard",
    element: <CompanyDashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CompanyDashboard />,
      },
      {
        path: "search-candidates",
        element: <CandidateSearch />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
