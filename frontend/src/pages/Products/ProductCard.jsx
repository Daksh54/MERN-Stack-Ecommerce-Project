import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="w-full max-w-sm bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10 group relative flex flex-col h-full">
      <div className="relative overflow-hidden aspect-square">
        <Link to={`/product/${p._id}`}>
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <HeartIcon product={p} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-black/50 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/10">
            {p?.brand}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h5 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            <Link to={`/product/${p._id}`}>{p?.name}</Link>
          </h5>
          <span className="text-lg font-bold text-primary">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {p?.description?.substring(0, 60)}...
        </p>

        <section className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-white transition-colors"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-primary/25"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={20} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
