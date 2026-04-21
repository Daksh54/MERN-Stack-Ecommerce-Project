import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import RoastConcierge from "../Chat/RoastConcierge";
import CoffeeBean3D from "../CoffeeBean3D";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(208,143,73,0.16),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(110,68,40,0.18),_transparent_30%),linear-gradient(180deg,_rgba(10,7,6,0.92),_rgba(10,7,6,0.98))]" />
      <CoffeeBean3D />
      <ToastContainer />
      <Header />
      <main className="relative z-10 flex-grow pt-24">
        <Outlet />
      </main>
      <Footer />
      <RoastConcierge />
    </div>
  );
};

export default Layout;
