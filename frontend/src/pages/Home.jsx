import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAllProductsQuery } from "../redux/api/productApiSlice";
import { useGetPersonalizedRecommendationsQuery } from "../redux/api/intelligenceApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Hero from "../components/Home/Hero";
import ProductCard from "./Products/ProductCard";

const experienceCards = [
  {
    title: "Single-origin beans",
    description: "Arabica and robusta offerings arranged by roast style.",
  },
  {
    title: "Coffee hardware",
    description: "Espresso machines, grinders, and AeroPress-friendly gear.",
  },
  {
    title: "Smart replenishment",
    description: "Profile-aware reorder planning and tailored restock ideas.",
  },
];

const Home = () => {
  const { keyword } = useParams();
  const { data = [], isLoading, isError, error } = useAllProductsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: recommendationData } = useGetPersonalizedRecommendationsQuery(undefined, {
    skip: !userInfo,
  });

  const featuredProducts = data.slice(0, 4);
  const beanHighlights = data.filter((product) => product.productType === "beans").slice(0, 3);
  const gearHighlights = data.filter((product) => product.productType === "equipment").slice(0, 3);

  return (
    <>
      {!keyword ? <Hero /> : null}

      <div className="container mx-auto space-y-14 px-4 py-12" id="featured">
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">{error?.data?.message || error?.error}</Message>
        ) : (
          <>
            <section className="coffee-panel grain-surface p-7">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="eyebrow">Roastery Features</div>
                  <h2 className="mt-3 text-4xl font-heading text-white">
                    A storefront shaped entirely around coffee rituals
                  </h2>
                </div>
                <p className="max-w-2xl text-stone-300">
                  Premium beans, brewing tools, and profile-driven recommendations.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {experienceCards.map((card) => (
                  <div key={card.title} className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
                    <h3 className="text-2xl font-heading text-white">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-400">{card.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="eyebrow">Featured Shelf</div>
                  <h2 className="mt-3 text-4xl font-heading text-white">
                    Curated roasts and barista-grade equipment
                  </h2>
                </div>
                <Link
                  to="/shop"
                  className="inline-flex w-fit rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  View the full collection
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {featuredProducts.map((product) => (
                  <div key={product._id} className="transition-all duration-300 hover:-translate-y-2">
                    <ProductCard p={product} />
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-8 xl:grid-cols-2">
              <div className="coffee-panel p-7">
                <div className="eyebrow">Bean Focus</div>
                <h3 className="mt-3 text-3xl font-heading text-white">
                  Arabica and robusta, merchandised like a real roastery
                </h3>
                <div className="mt-6 grid gap-4">
                  {beanHighlights.map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5 transition hover:border-amber-300/30"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-lg font-semibold text-white">{product.name}</div>
                          <div className="mt-1 text-sm text-stone-400">
                            {product.beanProfile?.origin || product.brand} ·{" "}
                            {product.beanProfile?.roastLevel || "medium"} roast
                          </div>
                        </div>
                        <div className="rounded-full bg-amber-400/10 px-3 py-1 text-sm text-amber-100">
                          ${product.price}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="coffee-panel p-7" id="concierge">
                <div className="eyebrow">AI Concierge</div>
                <h3 className="mt-3 text-3xl font-heading text-white">
                  A chatbot that helps shoppers choose instead of just chatting
                </h3>
                <p className="mt-4 text-stone-300">
                  The floating AI barista uses your brew method, roast preference, and current
                  store inventory to suggest the best beans and gear for your setup.
                </p>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5 text-sm text-stone-300">
                    Ask for a “syrupy espresso” or “fruity AeroPress” match.
                  </div>
                  <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5 text-sm text-stone-300">
                    Recommendations are pulled from our live roastery catalog.
                  </div>
                </div>
              </div>
            </section>

            <section className="coffee-panel p-7">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="eyebrow">Gear Section</div>
                  <h3 className="mt-3 text-3xl font-heading text-white">
                    Espresso, AeroPress, grinders, and brew tools
                  </h3>
                </div>
                <p className="max-w-2xl text-stone-400">
                  Equipment is merchandised alongside the beans it pairs with so shoppers can build
                  a full coffee station in one pass.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {gearHighlights.map((product) => (
                  <ProductCard key={product._id} p={product} />
                ))}
              </div>
            </section>

            {recommendationData?.recommendations?.length ? (
              <section className="coffee-panel p-7">
                <h3 className="text-3xl font-heading text-white">Personal flavor matches</h3>
                <p className="mt-2 text-stone-400">
                  These recommendations are ranked using your saved brewing methods and taste
                  profile.
                </p>
                <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {recommendationData.recommendations.slice(0, 3).map((product) => (
                    <ProductCard key={product._id} p={product} />
                  ))}
                </div>
              </section>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
