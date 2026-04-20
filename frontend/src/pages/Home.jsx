import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import { useGetPersonalizedRecommendationsQuery } from "../redux/api/intelligenceApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Hero from "../components/Home/Hero";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });
  const { userInfo } = useSelector((state) => state.auth);
  const { data: recommendationData } = useGetPersonalizedRecommendationsQuery(undefined, {
    skip: !userInfo,
  });

  return (
    <>
      {!keyword ? <Hero /> : null}

      <div className="container mx-auto px-4 py-16" id="featured">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">{error?.data?.message || error?.error}</Message>
        ) : (
          <>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-heading font-bold text-white">
                  Curated Roasts & Gear
                </h2>
                <p className="text-gray-400">
                  Coffee-first inventory tuned for home baristas and bean obsessives
                </p>
              </div>

              <Link
                to="/shop"
                className="hidden rounded-full border border-white/10 px-6 py-2 text-sm font-medium transition-colors hover:bg-white/5 md:block"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.products.map((product) => (
                <div key={product._id} className="transition-all duration-300 hover:-translate-y-2">
                  <Product product={product} />
                </div>
              ))}
            </div>

            {recommendationData?.recommendations?.length ? (
              <div className="mt-16 rounded-[2rem] border border-white/10 bg-[#120d09] p-6">
                <h3 className="text-2xl font-semibold text-white">AI flavor matches</h3>
                <p className="mt-2 text-stone-400">
                  The flavor matcher is ranking inventory against your brewing routine and taste profile.
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {recommendationData.recommendations.slice(0, 3).map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-12 text-center md:hidden">
              <Link
                to="/shop"
                className="rounded-full border border-white/10 px-6 py-2 text-sm font-medium transition-colors hover:bg-white/5"
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
