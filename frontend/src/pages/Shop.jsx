import { useState } from "react";
import { useAllProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const { data: products = [], isLoading, isError, error } = useAllProductsQuery();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedMethod, setSelectedMethod] = useState("all");
  const [priceCap, setPriceCap] = useState(1500);
  const [sortBy, setSortBy] = useState("featured");

  const uniqueBrands = [...new Set(products.map((product) => product.brand).filter(Boolean))];
  const brewMethods = [
    ...new Set(
      products.flatMap((product) => [
        ...(product.beanProfile?.recommendedBrewingMethods || []),
        ...(product.equipmentProfile?.supportedBrewingMethods || []),
      ])
    ),
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      !search ||
      `${product.name} ${product.description} ${product.brand} ${product.beanProfile?.origin || ""}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesType = activeType === "all" || product.productType === activeType;
    const matchesCategory =
      !selectedCategories.length || selectedCategories.includes(product.category?._id || product.category);
    const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
    const methods = [
      ...(product.beanProfile?.recommendedBrewingMethods || []),
      ...(product.equipmentProfile?.supportedBrewingMethods || []),
    ];
    const matchesMethod = selectedMethod === "all" || methods.includes(selectedMethod);
    const matchesPrice = Number(product.price || 0) <= priceCap;

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesBrand &&
      matchesMethod &&
      matchesPrice
    );
  });

  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((left, right) => left.price - right.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((left, right) => right.price - left.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((left, right) => right.rating - left.rating);
  } else {
    filteredProducts = [...filteredProducts].sort(
      (left, right) =>
        Number(right.marketing?.featuredHeadline?.length || 0) -
          Number(left.marketing?.featuredHeadline?.length || 0) ||
        right.rating - left.rating
    );
  }

  const toggleCategory = (categoryId) => {
    setSelectedCategories((current) =>
      current.includes(categoryId)
        ? current.filter((entry) => entry !== categoryId)
        : [...current, categoryId]
    );
  };

  return (
    <div className="container mx-auto px-4 pb-16">
      <section className="coffee-panel grain-surface p-7">
        <div className="grid gap-8 xl:grid-cols-[0.32fr,1fr]">
          <aside className="space-y-6">
            <div>
              <div className="eyebrow">Browse the Shelf</div>
              <h1 className="mt-3 text-4xl font-heading text-white">Coffee roaster inventory</h1>
              <p className="mt-3 text-sm leading-7 text-stone-400">
                Find the right bag or machine faster.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search beans, origins, gear..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-amber-300/30"
            />

            <div>
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-stone-500">Product Type</div>
              <div className="flex flex-wrap gap-2">
                {["all", "beans", "equipment", "bundle", "subscription"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setActiveType(type)}
                    className={`rounded-full px-3 py-2 text-xs uppercase tracking-[0.18em] transition ${
                      activeType === type
                        ? "bg-amber-400 text-stone-950"
                        : "border border-white/10 bg-white/5 text-stone-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-stone-500">Categories</div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category._id} className="flex items-center gap-3 text-sm text-stone-300">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => toggleCategory(category._id)}
                      className="accent-amber-400"
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-stone-500">Brand</div>
              <select
                value={selectedBrand}
                onChange={(event) => setSelectedBrand(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              >
                <option value="all">All brands</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="mb-3 text-sm uppercase tracking-[0.28em] text-stone-500">Brew Method</div>
              <select
                value={selectedMethod}
                onChange={(event) => setSelectedMethod(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              >
                <option value="all">All methods</option>
                {brewMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between text-sm uppercase tracking-[0.28em] text-stone-500">
                <span>Max Price</span>
                <span>${priceCap}</span>
              </div>
              <input
                type="range"
                min="20"
                max="1500"
                step="10"
                value={priceCap}
                onChange={(event) => setPriceCap(Number(event.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveType("all");
                setSelectedCategories([]);
                setSelectedBrand("all");
                setSelectedMethod("all");
                setPriceCap(1500);
                setSortBy("featured");
              }}
              className="w-full rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Reset filters
            </button>
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-stone-400">{filteredProducts.length} products found</div>
                <h2 className="mt-1 text-3xl font-heading text-white">
                  Beans, coffee machines, and brew gear
                </h2>
              </div>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Highest rated</option>
                <option value="price-low">Price: Low to high</option>
                <option value="price-high">Price: High to low</option>
              </select>
            </div>

            {isLoading ? (
              <Loader />
            ) : isError ? (
              <Message variant="danger">{error?.data?.message || error?.error}</Message>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} p={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
