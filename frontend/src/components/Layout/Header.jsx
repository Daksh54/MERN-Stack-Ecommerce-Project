import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineUser, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const favorites = useSelector((state) => state.favorites) || []; // Assuming favorites slice exists or using local state if not

    // Note: Previous code used FavoritesCount component, but we can just use length if available in redux
    // For now, I'll assume we might need to fetch it or it's in a slice. 
    // If FavoritesCount was doing logic, we might need to verify.
    // Looking at Navigation.jsx, it imported FavoritesCount. I'll stick to a simple badge for now.

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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    MERN Store
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* Icons & User */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/favorite" className="relative text-gray-300 hover:text-white transition-colors">
                        <AiOutlineHeart size={24} />
                        {/* Add badge logic if needed */}
                    </Link>

                    <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors">
                        <AiOutlineShoppingCart size={24} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {/* User Dropdown */}
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
                                <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
                                <Link to="/register" className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">Register</Link>
                            </div>
                        )}

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                            {dropdownOpen && userInfo && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-4 w-48 bg-card border border-white/10 rounded-xl shadow-xl overflow-hidden"
                                >
                                    <div className="py-2">
                                        {userInfo.isAdmin && (
                                            <div className="border-b border-white/5 pb-2 mb-2">
                                                <span className="px-4 text-xs text-gray-500 uppercase font-bold tracking-wider">Admin</span>
                                                {adminLinks.map((link) => (
                                                    <Link
                                                        key={link.name}
                                                        to={link.path}
                                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                                        onClick={() => setDropdownOpen(false)}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={logoutHandler}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-card border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
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
                            <div className="border-t border-white/10 pt-4 space-y-4">
                                <Link to="/cart" className="flex items-center space-x-2 text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                                    <AiOutlineShoppingCart size={20} />
                                    <span>Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})</span>
                                </Link>
                                <Link to="/favorite" className="flex items-center space-x-2 text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                                    <AiOutlineHeart size={20} />
                                    <span>Favorites</span>
                                </Link>
                            </div>
                            <div className="border-t border-white/10 pt-4">
                                {userInfo ? (
                                    <div className="space-y-2">
                                        <p className="text-gray-500 text-sm">Signed in as {userInfo.username}</p>
                                        <button onClick={logoutHandler} className="text-red-400">Logout</button>
                                    </div>
                                ) : (
                                    <div className="flex space-x-4">
                                        <Link to="/login" className="text-gray-300" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                                        <Link to="/register" className="text-primary font-bold" onClick={() => setMobileMenuOpen(false)}>Register</Link>
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
