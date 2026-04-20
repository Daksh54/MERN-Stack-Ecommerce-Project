import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border bg-secondary py-12 text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-heading font-bold text-transparent">
              RoastFlow Exchange
            </h3>
            <p className="text-sm text-gray-400">
              A premium coffee marketplace powered by flavor profiling, dynamic pricing, and predictive replenishment.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  All Coffees
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  Single Origin
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  Espresso Gear
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  Brewing Equipment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="transition-colors hover:text-primary">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="transition-colors hover:text-primary">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold">Connect</h4>
            <div className="mb-4 flex space-x-4">
              <a href="#" className="rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-primary">
                <FaFacebook />
              </a>
              <a href="#" className="rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-primary">
                <FaTwitter />
              </a>
              <a href="#" className="rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-primary">
                <FaInstagram />
              </a>
              <a href="#" className="rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-primary">
                <FaLinkedin />
              </a>
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} RoastFlow Exchange. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
