import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import CoffeeProfileFields from "../../components/CoffeeProfileFields";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useGetSubscriptionPlanQuery } from "../../redux/api/intelligenceApiSlice";

const defaultCoffeeProfile = {
  brewingMethods: [],
  acidityTolerance: 3,
  roastPreference: "medium",
  beanPreference: "single-origin arabica",
  flavorNotes: [],
  preferredOrigins: [],
  preferredEquipment: [],
  dailyCups: 2,
};

const defaultSubscription = {
  enabled: false,
  reminderLeadDays: 2,
};

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [coffeeProfile, setCoffeeProfile] = useState(defaultCoffeeProfile);
  const [smartSubscription, setSmartSubscription] = useState(defaultSubscription);

  const { userInfo } = useSelector((state) => state.auth);
  const { data: subscriptionPlan } = useGetSubscriptionPlanQuery(undefined, {
    skip: !userInfo,
  });

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    setUserName(userInfo.username);
    setEmail(userInfo.email);
    setCoffeeProfile(userInfo.coffeeProfile || defaultCoffeeProfile);
    setSmartSubscription(userInfo.smartSubscription || defaultSubscription);
  }, [userInfo]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
          coffeeProfile,
          smartSubscription,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        setPassword("");
        setConfirmPassword("");
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto mt-[6rem] p-4">
      <div className="grid gap-8 lg:grid-cols-[1fr,0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#130d09] p-6">
          <h2 className="mb-2 text-3xl font-semibold text-white">Update Profile</h2>
          <p className="mb-6 text-stone-400">
            Keep your brew preferences fresh so the flavor matcher, pricing alerts, and subscription engine stay accurate.
          </p>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="mb-2 block text-white">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input w-full rounded-xl border border-white/10 bg-black/30 p-4"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-white">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input w-full rounded-xl border border-white/10 bg-black/30 p-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-white">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input w-full rounded-xl border border-white/10 bg-black/30 p-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-white">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input w-full rounded-xl border border-white/10 bg-black/30 p-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <CoffeeProfileFields
              coffeeProfile={coffeeProfile}
              smartSubscription={smartSubscription}
              onCoffeeProfileChange={setCoffeeProfile}
              onSmartSubscriptionChange={setSmartSubscription}
            />

            <div className="mt-6 flex justify-between">
              <button
                type="submit"
                className="rounded-full bg-amber-500 px-5 py-3 font-semibold text-stone-950 transition hover:bg-amber-400"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="rounded-full border border-white/10 px-5 py-3 text-white transition hover:bg-white/5"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-emerald-400/15 bg-emerald-500/5 p-6">
            <h3 className="text-xl font-semibold text-white">Smart Subscription Forecast</h3>
            <p className="mt-2 text-stone-400">
              {subscriptionPlan?.message ||
                "Once you have paid bean orders, the system will predict your depletion date automatically."}
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm text-stone-400">Estimated daily usage</div>
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
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#120d09] p-6">
            <h3 className="text-xl font-semibold text-white">Next replenishment cart</h3>
            <div className="mt-4 space-y-3">
              {(subscriptionPlan?.prefilledCart || []).length ? (
                subscriptionPlan.prefilledCart.map((item) => (
                  <div
                    key={`${item.product}-${item.name}`}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="mt-1 text-sm text-stone-400">{item.reason}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-stone-400">
                  Your prefilled restock cart will appear here after the first paid bean order.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
