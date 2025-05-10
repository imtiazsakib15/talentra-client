import NavBar from "@/components/shared/NavBar/NavBar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
