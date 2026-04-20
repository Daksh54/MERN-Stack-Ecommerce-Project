import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useTrackProductViewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import ProductModelViewer from "../../components/Products/ProductModelViewer";
import RecommendationRail from "../../components/Products/RecommendationRail";
import {
  useGetPersonalizedRecommendationsQuery,
  useGetPricingInsightQuery,
  useGetSubscriptionPlanQuery,
} from "../../redux/api/intelligenceApiSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasTrackedView = useRef(false);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const { data: recommendationData } = useGetPersonalizedRecommendationsQuery(undefined, {
    skip: !userInfo,
  });
  const { data: pricingInsight } = useGetPricingInsightQuery(productId);
  const { data: subscriptionPlan } = useGetSubscriptionPlanQuery(undefined, {
    skip: !userInfo,
  });

  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
  const [trackProductView] = useTrackProductViewMutation();

  useEffect(() => {
    if (!productId || hasTrackedView.current) {
      return;
    }

    hasTrackedView.current = true;
    trackProductView(productId).catch(() => {});
  }, [productId, trackProductView]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (reviewError) {
      toast.error(reviewError?.data || reviewError.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
        >
          &larr; Back to the coffee shelf
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.message}</Message>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur-md">
                <HeartIcon product={product} />
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="mb-2 text-4xl font-heading font-bold text-white">{product.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <FaStore className="mr-1" /> {product.brand}
                  </span>
                  <span className="flex items-center">
                    <FaStar className="mr-1 text-yellow-400" /> {product.rating} (
                    {product.numReviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-amber-100">
                  {product.productType}
                </span>
                {product.beanProfile?.origin ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-stone-200">
                    {product.beanProfile.origin}
                  </span>
                ) : null}
                {product.beanProfile?.roastLevel ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-stone-200">
                    {product.beanProfile.roastLevel} roast
                  </span>
                ) : null}
              </div>

              <p className="text-lg leading-relaxed text-gray-300">{product.description}</p>

              <div className="flex flex-wrap items-end gap-4">
                <div className="text-5xl font-bold text-primary">${product.price}</div>
                {pricingInsight?.priceChangePct ? (
                  <div
                    className={`rounded-full px-3 py-1 text-sm ${
                      pricingInsight.priceChangePct > 0
                        ? "bg-rose-500/10 text-rose-200"
                        : "bg-emerald-500/10 text-emerald-200"
                    }`}
                  >
                    {pricingInsight.priceChangePct > 0 ? "+" : ""}
                    {pricingInsight.priceChangePct}% demand-adjusted
                  </div>
                ) : null}
              </div>

              {pricingInsight?.explanation ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-stone-300">
                  {pricingInsight.explanation}
                </div>
              ) : null}

              <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <FaClock className="text-primary" />
                  <span>Added {moment(product.createdAt).fromNow()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <FaBox className="text-primary" />
                  <span>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <FaShoppingCart className="text-primary" />
                  <span>Sold: {product.quantity}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <FaStore className="text-primary" />
                  <span>Forecast: {Math.round(pricingInsight?.forecastDemand || 0)} units</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-[#120d09] p-4">
                  <div className="text-sm uppercase tracking-[0.25em] text-stone-500">
                    Flavor notes
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(product.beanProfile?.tastingNotes || []).map((note) => (
                      <span
                        key={note}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-stone-200"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#120d09] p-4">
                  <div className="text-sm uppercase tracking-[0.25em] text-stone-500">
                    Best brew methods
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(
                      product.beanProfile?.recommendedBrewingMethods ||
                      product.equipmentProfile?.supportedBrewingMethods ||
                      []
                    ).map((method) => (
                      <span
                        key={method}
                        className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-100"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {product.countInStock > 0 && (
                <div className="flex flex-col gap-4 sm:flex-row">
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="rounded-lg border border-white/20 bg-card px-4 py-3 text-white transition-colors focus:border-primary focus:outline-none"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        Qty: {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={addToCartHandler}
                    className="flex-1 rounded-lg bg-primary px-8 py-3 font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
                  >
                    Add To Brew Cart
                  </button>
                </div>
              )}

              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold">Reviews</h3>
                <ProductTabs
                  loadingProductReview={loadingProductReview}
                  userInfo={userInfo}
                  submitHandler={submitHandler}
                  rating={rating}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  product={product}
                />
              </div>
            </div>
          </div>

          <ProductModelViewer interactiveModel={product.interactiveModel} />

          {userInfo ? (
            <div className="rounded-3xl border border-emerald-400/15 bg-emerald-500/5 p-5">
              <h3 className="text-xl font-semibold text-white">Smart Subscription Forecast</h3>
              <p className="mt-2 text-sm text-stone-300">
                {subscriptionPlan?.message ||
                  "The replenishment engine will estimate your run-out date after you place a paid bean order."}
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm text-stone-400">Daily usage</div>
                  <div className="mt-2 text-2xl font-semibold text-white">
                    {Math.round(subscriptionPlan?.estimatedDailyGrams || 0)}g
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm text-stone-400">Days remaining</div>
                  <div className="mt-2 text-2xl font-semibold text-white">
                    {subscriptionPlan?.estimatedDaysRemaining || 0}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm text-stone-400">Reminder lead</div>
                  <div className="mt-2 text-2xl font-semibold text-white">
                    {userInfo.smartSubscription?.reminderLeadDays || 2}d
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <RecommendationRail
            data={(recommendationData?.recommendations || []).filter(
              (entry) => entry._id !== product._id
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
