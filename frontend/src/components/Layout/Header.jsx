import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Products", path: "/admin/productlist" },
    { name: "Category", path: "/admin/categorylist" },
    { name: "Orders", path: "/admin/orderlist" },
    { name: "Users", path: "/admin/userlist" },
  ];

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-background/80 py-4 shadow-lg backdrop-blur-md"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link
          to="/"
          className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-heading font-bold text-transparent"
        >
          RoastFlow Exchange
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="group relative text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-6 md:flex">
          <Link to="/favorite" className="relative text-gray-300 transition-colors hover:text-white">
            <AiOutlineHeart size={24} />
          </Link>

          <Link to="/cart" className="relative text-gray-300 transition-colors hover:text-white">
            <AiOutlineShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          <div className="relative">
            {userInfo ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
              >
                <span>{userInfo.username}</span>
                <AiOutlineUser size={20} />
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
                >
                  Register
                </Link>
              </div>
            )}

            <AnimatePresence>
              {dropdownOpen && userInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 w-48 overflow-hidden rounded-xl border border-white/10 bg-card shadow-xl"
                >
                  <div className="py-2">
                    {userInfo.isAdmin && (
                      <div className="mb-2 border-b border-white/5 pb-2">
                        <span className="px-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                          Admin
                        </span>
                        {adminLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.path}
                            className="block px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="block w-full px-4 py-2 text-left text-sm text-red-400 transition-colors hover:bg-white/5 hover:text-red-300"
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button className="text-white md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/10 bg-card md:hidden"
          >
            <div className="space-y-4 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-lg font-medium text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="space-y-4 border-t border-white/10 pt-4">
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <AiOutlineShoppingCart size={20} />
                  <span>Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})</span>
                </Link>
                <Link
                  to="/favorite"
                  className="flex items-center space-x-2 text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <AiOutlineHeart size={20} />
                  <span>Favorites</span>
                </Link>
              </div>
              <div className="border-t border-white/10 pt-4">
                {userInfo ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Signed in as {userInfo.username}</p>
                    <button onClick={logoutHandler} className="text-red-400">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      to="/login"
                      className="text-gray-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="font-bold text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
