import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import CoffeeProductImage from "../../components/Products/CoffeeProductImage";

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
    <div className="group relative flex h-full w-full max-w-sm flex-col overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#18110d] shadow-lg transition-all duration-300 hover:border-amber-300/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
      <div className="relative overflow-hidden border-b border-white/10">
        <Link to={`/product/${p._id}`}>
          <CoffeeProductImage
            product={p}
            className="aspect-[5/4]"
            imageClassName="transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
          <HeartIcon product={p} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
            {p?.productType}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h5 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-primary">
            <Link to={`/product/${p._id}`}>{p?.name}</Link>
          </h5>
          <span className="text-lg font-bold text-primary">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-stone-500">
          {p.beanProfile?.origin ? <span>{p.beanProfile.origin}</span> : null}
          {p.beanProfile?.species ? <span>{p.beanProfile.species}</span> : null}
          {p.equipmentProfile?.equipmentType ? <span>{p.equipmentProfile.equipmentType}</span> : null}
        </div>

        <p className="mb-5 flex-grow text-sm leading-7 text-stone-400">
          {p?.marketing?.featuredHeadline || p?.description?.substring(0, 92)}...
        </p>

        <section className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-white"
          >
            View Product
            <svg
              className="ml-2 h-3.5 w-3.5"
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
            className="rounded-full bg-primary/10 p-2 text-primary shadow-lg transition-all hover:bg-primary hover:text-stone-950 hover:shadow-primary/25"
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
