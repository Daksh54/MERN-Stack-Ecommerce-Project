import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-secondary text-secondary-foreground py-12 mt-auto border-t border-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            MERN Store
                        </h3>
                        <p className="text-sm text-gray-400">
                            Premium e-commerce experience tailored for you. Quality products, seamless shopping.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
                            <li><Link to="/category/electronics" className="hover:text-primary transition-colors">Electronics</Link></li>
                            <li><Link to="/category/fashion" className="hover:text-primary transition-colors">Fashion</Link></li>
                            <li><Link to="/category/home" className="hover:text-primary transition-colors">Home & Living</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
                            <li><Link to="/returns" className="hover:text-primary transition-colors">Returns</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors text-white"><FaFacebook /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors text-white"><FaTwitter /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors text-white"><FaInstagram /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors text-white"><FaLinkedin /></a>
                        </div>
                        <p className="text-xs text-gray-500">© {new Date().getFullYear()} MERN Store. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
