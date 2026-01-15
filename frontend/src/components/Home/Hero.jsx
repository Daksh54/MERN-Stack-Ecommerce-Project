import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineArrowRight } from "react-icons/ai";

const Hero = () => {
    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-background">
            {/* Background gradients or image */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-background to-background"></div>

            <div className="container relative mx-auto px-4 text-center z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                >
                    Elevate Your Lifestyle
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
                >
                    Discover our curated collection of premium products designed to enhance your everyday life. Quality meets aesthetics.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex justify-center gap-4"
                >
                    <Link
                        to="/shop"
                        className="group flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                    >
                        Shop Now
                        <AiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                        href="#featured"
                        className="px-8 py-4 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all"
                    >
                        Explore
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
