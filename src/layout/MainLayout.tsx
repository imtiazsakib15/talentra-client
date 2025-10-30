import Navbar from "@/components/navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
