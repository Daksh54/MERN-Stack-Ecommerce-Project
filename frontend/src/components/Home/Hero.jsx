import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineArrowRight } from "react-icons/ai";

const Hero = () => {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-background">
      <div className="absolute left-0 top-0 h-full w-full opacity-30 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.28),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(120,53,15,0.35),_transparent_35%)]"></div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-sm uppercase tracking-[0.35em] text-amber-300"
        >
          Premium Coffee Exchange
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-5xl font-heading font-bold text-transparent md:text-7xl"
        >
          Find the exact roast your palate has been waiting for.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-gray-400 md:text-xl"
        >
          Coffee beans, brewing gear, predictive pricing, and AI flavor matching tuned to the way you actually brew at home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Link
            to="/shop"
            className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
          >
            Explore Roasts
            <AiOutlineArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#featured"
            className="rounded-full border border-white/20 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/5"
          >
            Explore
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
