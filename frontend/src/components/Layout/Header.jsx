import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
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
    { name: "Profile", path: "/profile" },
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
          ? "border-b border-white/10 bg-[#120c09]/85 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/25 bg-amber-400 text-sm font-bold tracking-[0.3em] text-stone-950">
            RF
          </span>
          <span>
            <span className="block font-heading text-2xl text-white">RoastFlow Roastery</span>
            <span className="block text-[11px] uppercase tracking-[0.35em] text-amber-200/70">
              Beans, gear, and brew intelligence
            </span>
          </span>
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "group relative text-sm font-medium transition-colors hover:text-white",
                location.pathname === link.path ? "text-white" : "text-stone-300"
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute -bottom-2 left-0 h-0.5 bg-primary transition-all",
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                )}
              ></span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-6 md:flex">
          <Link to="/favorite" className="relative text-stone-300 transition-colors hover:text-white">
            <AiOutlineHeart size={24} />
          </Link>

          <Link to="/cart" className="relative text-stone-300 transition-colors hover:text-white">
            <AiOutlineShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-stone-950">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          <div className="relative">
            {userInfo ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-200 hover:text-white focus:outline-none"
              >
                <span>{userInfo.username}</span>
                <AiOutlineUser size={20} />
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-stone-300 transition-colors hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-stone-950 shadow-lg shadow-primary/25 transition-all hover:bg-[#e09e56]"
                >
                  Join the Roastery
                </Link>
              </div>
            )}

            <AnimatePresence>
              {dropdownOpen && userInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-4 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#18110d] shadow-xl"
                >
                  <div className="py-2">
                    {userInfo.isAdmin && (
                      <div className="mb-2 border-b border-white/5 pb-2">
                        <span className="px-4 text-xs font-bold uppercase tracking-wider text-stone-500">
                          Admin
                        </span>
                        {adminLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.path}
                            className="block px-4 py-2 text-sm text-stone-300 transition-colors hover:bg-white/5 hover:text-white"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-stone-300 transition-colors hover:bg-white/5 hover:text-white"
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
            className="overflow-hidden border-b border-white/10 bg-[#18110d] md:hidden"
          >
            <div className="space-y-4 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-lg font-medium text-stone-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="space-y-4 border-t border-white/10 pt-4">
                <Link
                  to="/cart"
                  className="flex items-center space-x-2 text-stone-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <AiOutlineShoppingCart size={20} />
                  <span>Arabica bean, expresso machine, robusta bean etc. ({cartItems.reduce((a, c) => a + c.qty, 0)})</span>
                </Link>
                <Link
                  to="/favorite"
                  className="flex items-center space-x-2 text-stone-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <AiOutlineHeart size={20} />
                  <span>Favorites</span>
                </Link>
              </div>
              <div className="border-t border-white/10 pt-4">
                {userInfo ? (
                  <div className="space-y-2">
                    <p className="text-sm text-stone-500">Signed in as {userInfo.username}</p>
                    <button onClick={logoutHandler} className="text-red-400">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      to="/login"
                      className="text-stone-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="font-bold text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Join
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
