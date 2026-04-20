import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <ToastContainer />
            <Header />
            <main className="flex-grow pt-20"> {/* pt-20 to account for fixed header */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
