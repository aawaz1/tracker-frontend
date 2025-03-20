import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = ["/signin", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow p-4">
        <Outlet />
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
