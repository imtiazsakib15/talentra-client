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
// import CompanyDashboard from "@/pages/company-dashboard/CompanyDashboard";
import CandidateSearch from "@/pages/company-dashboard/SearchCandidate";
import CandidateDetails from "@/pages/company-dashboard/CandidateDetails";
import SentInvitations from "@/pages/company-dashboard/SentInvitations";
import CandidateDashboardLayout from "@/layout/CandidateDashboardLayout";
import MyProfile from "@/pages/candidate-dashboard/MyProfile";
import ReceivedInvitations from "@/pages/candidate-dashboard/ReceivedInvitations";
import ScheduledInterviews from "@/pages/candidate-dashboard/ScheduledInterviews";
import CompanyProfilePage from "@/pages/company-dashboard/CompanyProfilePage";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import ManageUsers from "@/pages/admin-dashboard/ManageUsers";
import ManageSkillsPage from "@/pages/admin-dashboard/ManageSkillsPage";
import AdminRoute from "@/components/AdminRoute";
import CandidateRoute from "@/components/CandidateRoute";

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
    path: "/company",
    element: <CompanyDashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "dashboard",
      //   element: <CompanyDashboard />,
      // },
      { path: "profile", element: <CompanyProfilePage /> },
      {
        path: "search-candidates",
        element: <CandidateSearch />,
      },
      {
        path: "candidates/:id",
        element: <CandidateDetails />,
      },
      {
        path: "sent-invitations",
        element: <SentInvitations />,
      },
    ],
  },
  {
    path: "/candidate",
    element: (
      <CandidateRoute>
        <CandidateDashboardLayout />
      </CandidateRoute>
    ),
    children: [
      // { index: true, element: <CandidateDashboard /> },
      { path: "profile", element: <MyProfile /> },
      { path: "received-invitations", element: <ReceivedInvitations /> },
      { path: "interviews", element: <ScheduledInterviews /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashboardLayout />
      </AdminRoute>
    ),
    children: [
      { path: "manage-users", element: <ManageUsers /> },
      { path: "manage-skills", element: <ManageSkillsPage /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
