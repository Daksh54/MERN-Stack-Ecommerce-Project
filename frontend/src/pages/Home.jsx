import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Hero from "../components/Home/Hero";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Hero /> : null}

      <div className="container mx-auto px-4 py-16" id="featured">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {error?.data?.message || error?.error}
          </Message>
        ) : (
          <>
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-heading font-bold text-white mb-2">
                  Special Products
                </h2>
                <p className="text-gray-400">Handpicked items just for you</p>
              </div>

              <Link
                to="/shop"
                className="hidden md:block px-6 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {data.products.map((product) => (
                <div key={product._id} className="transition-all duration-300 hover:-translate-y-2">
                  <Product product={product} />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center md:hidden">
              <Link
                to="/shop"
                className="px-6 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors"
              >
                View All Products
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
