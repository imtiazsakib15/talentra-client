import Navbar from "@/components/navbar";
import { Outlet } from "react-router";
import Footer from "@/components/shared/Footer";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
