import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import CoffeeProductImage from "../components/Products/CoffeeProductImage";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
        {cartItems.length === 0 ? (
          <div className="coffee-panel p-8 text-stone-300">
            Your Arabica bean, expresso machine, robusta bean etc. is empty.{" "}
            <Link to="/shop" className="text-primary">
              Explore the shop
            </Link>
          </div>
        ) : (
          <>
            <div className="coffee-panel p-6">
              <div className="eyebrow">Arabica bean, expresso machine, robusta bean etc.</div>
              <h1 className="mb-6 mt-3 text-4xl font-heading text-white">Arabica bean, expresso machine, robusta bean etc.</h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="mb-4 flex flex-wrap items-center gap-4 rounded-[1.6rem] border border-white/10 bg-black/20 p-4"
                >
                  <div className="h-20 w-20">
                    <CoffeeProductImage
                      product={item}
                      className="h-full w-full rounded-2xl"
                      imageClassName="rounded-2xl"
                    />
                  </div>

                  <div className="ml-4 flex-1">
                    <Link to={`/product/${item._id}`} className="text-lg font-semibold text-white">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-stone-400">{item.brand}</div>
                    <div className="mt-2 font-bold text-primary">$ {item.price}</div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-full rounded-xl border border-white/10 bg-[#1d1410] p-2 text-white"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="rounded-full border border-white/10 p-3 text-red-400 transition hover:bg-white/5"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="coffee-panel h-fit p-6">
              <div className="eyebrow">Summary</div>
              <h2 className="mt-3 text-3xl font-heading text-white">Order totals</h2>
              <div className="mt-6 space-y-4 text-stone-300">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-stone-400">
                  Fresh-roasted beans and brewing gear selected for your next setup refresh.
                </div>
              </div>

              <button
                className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-lg font-semibold text-stone-950 transition hover:bg-[#dfa15d]"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
