import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

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
    } catch (error) {
      toast.error(error?.data || error.message);
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
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          &larr; Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/10 aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full">
              <HeartIcon product={product} />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-4xl font-heading font-bold text-white mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center"><FaStore className="mr-1" /> {product.brand}</span>
                <span className="flex items-center"><FaStar className="mr-1 text-yellow-400" /> {product.rating} ({product.numReviews} reviews)</span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="text-5xl font-bold text-primary">
              ${product.price}
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-6">
              <div className="flex items-center gap-2 text-gray-300">
                <FaClock className="text-primary" />
                <span>Added {moment(product.createAt).fromNow()}</span>
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
                <span>Free Shipping</span>
              </div>
            </div>

            {product.countInStock > 0 && (
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-card border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      Qty: {x + 1}
                    </option>
                  ))}
                </select>

                <button
                  onClick={addToCartHandler}
                  className="flex-1 bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add To Cart
                </button>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Reviews</h3>
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
      )}
    </div>
  );
};

export default ProductDetails;
