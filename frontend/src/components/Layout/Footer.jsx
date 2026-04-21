import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-auto border-t border-white/10 bg-[#120c09]/90 py-14 text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="eyebrow">Roastery Since 2018</div>
            <h3 className="text-3xl font-heading text-white">RoastFlow Roastery</h3>
            <p className="text-sm text-stone-400">
              A coffee-first storefront for single-origin beans, espresso hardware, brew
              education, and AI-guided product matching.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Collections</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  Arabica Roasts
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  Robusta Lots
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  Espresso Machines
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  AeroPress & Manual Brew Gear
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Experience</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  Roast Concierge
                </Link>
              </li>
              <li>
                <Link to="/profile" className="transition-colors hover:text-primary">
                  Flavor Profile
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  Brew Guides
                </Link>
              </li>
              <li>
                <Link to="/profile" className="transition-colors hover:text-primary">
                  Smart Subscription
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">Stay Connected</h4>
            <p className="mb-4 text-sm text-stone-400">
              Weekly roast drops, brew experiments, and early access to limited equipment bundles.
            </p>
            <div className="mb-4 flex space-x-4">
              <a href="#" className="rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-primary hover:text-stone-950">
                <FaFacebook />
              </a>
              <a href="#" className="rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-primary hover:text-stone-950">
                <FaTwitter />
              </a>
              <a href="#" className="rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-primary hover:text-stone-950">
                <FaInstagram />
              </a>
              <a href="#" className="rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-primary hover:text-stone-950">
                <FaLinkedin />
              </a>
            </div>
            <p className="text-xs text-stone-500">
              © {new Date().getFullYear()} RoastFlow Roastery. Crafted for curious coffee drinkers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
