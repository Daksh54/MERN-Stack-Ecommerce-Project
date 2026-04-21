import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import CoffeeProductImage from "../../components/Products/CoffeeProductImage";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (submitError) {
      toast.error(submitError);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto space-y-8 px-4 pb-16">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="coffee-panel overflow-x-auto p-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-left text-sm uppercase tracking-[0.2em] text-stone-500">
                  <td className="px-1 py-3 align-top">Image</td>
                  <td className="px-1 py-3">Product</td>
                  <td className="px-1 py-3">Quantity</td>
                  <td className="px-1 py-3">Price</td>
                  <td className="px-1 py-3">Total</td>
                </tr>
              </thead>

              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="p-3">
                      <CoffeeProductImage
                        product={item}
                        className="h-16 w-16 rounded-2xl"
                        imageClassName="rounded-2xl"
                      />
                    </td>

                    <td className="p-3">
                      <Link to={`/product/${item.product}`} className="text-white">
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-3 text-stone-300">{item.qty}</td>
                    <td className="p-3 text-stone-300">{item.price.toFixed(2)}</td>
                    <td className="p-3 text-stone-300">$ {(item.qty * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="coffee-panel p-8">
          <h2 className="text-3xl font-heading text-white">Order Summary</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <h3 className="text-xl font-semibold text-white">Totals</h3>
              <ul className="mt-4 space-y-3 text-stone-300">
                <li>Items: ${cart.itemsPrice}</li>
                <li>Shipping: ${cart.shippingPrice}</li>
                <li>Tax: ${cart.taxPrice}</li>
                <li>Total: ${cart.totalPrice}</li>
              </ul>
            </div>

            {error && <Message variant="danger">{error.data.message}</Message>}

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <h3 className="text-xl font-semibold text-white">Shipping</h3>
              <p className="mt-4 text-stone-300">
                <strong>Address:</strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <h3 className="text-xl font-semibold text-white">Payment Method</h3>
              <p className="mt-4 text-stone-300">
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-full bg-primary px-4 py-3 text-lg font-semibold text-stone-950 transition hover:bg-[#dfa15d]"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
