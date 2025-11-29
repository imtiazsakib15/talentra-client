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
import CandidateDetails from "@/pages/company-dashboard/CandidateDetails";
import SentInterests from "@/pages/company-dashboard/SentInterests";
import CandidateDashboardLayout from "@/layout/CandidateDashboardLayout";

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
      {
        path: "candidates/:id",
        element: <CandidateDetails />,
      },
      {
        path: "sent-interests",
        element: <SentInterests />,
      },
    ],
  },
  {
    path: "/candidate/dashboard",
    element: <CandidateDashboardLayout />,
    children: [
      // { index: true, element: <CandidateDashboard /> },
      // { path: "profile", element: <CandidateProfile /> },
      // { path: "interests/received", element: <CandidateInterests /> },
      // { path: "interviews", element: <CandidateInterviews /> },
      // { path: "settings", element: <CandidateSettings /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
