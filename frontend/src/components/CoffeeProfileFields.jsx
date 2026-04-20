const brewingOptions = [
  "espresso",
  "pour-over",
  "french press",
  "aeropress",
  "cold brew",
  "moka pot",
];

const originOptions = ["ethiopia", "colombia", "kenya", "guatemala", "brazil", "sumatra"];
const noteOptions = ["citrus", "berry", "chocolate", "caramel", "floral", "nutty"];

const toggleItem = (items, item) =>
  items.includes(item) ? items.filter((entry) => entry !== item) : [...items, item];

const CheckboxGrid = ({ items, selected, onToggle }) => (
  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
    {items.map((item) => (
      <button
        key={item}
        type="button"
        onClick={() => onToggle(item)}
        className={`rounded-full border px-3 py-2 text-sm capitalize transition ${
          selected.includes(item)
            ? "border-amber-400 bg-amber-500/15 text-amber-100"
            : "border-white/10 bg-white/5 text-gray-300"
        }`}
      >
        {item}
      </button>
    ))}
  </div>
);

const CoffeeProfileFields = ({
  coffeeProfile,
  smartSubscription,
  onCoffeeProfileChange,
  onSmartSubscriptionChange,
}) => {
  const updateProfile = (field, value) => {
    onCoffeeProfileChange({ ...coffeeProfile, [field]: value });
  };

  return (
    <div className="space-y-6 rounded-3xl border border-white/10 bg-[#130d09] p-5">
      <div>
        <h3 className="text-lg font-semibold text-white">Flavor Profile</h3>
        <p className="mt-1 text-sm text-stone-400">
          These preferences drive the flavor matcher, predictive pricing, and smart replenishment.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-stone-200">Brewing Methods</label>
        <CheckboxGrid
          items={brewingOptions}
          selected={coffeeProfile.brewingMethods}
          onToggle={(value) =>
            updateProfile("brewingMethods", toggleItem(coffeeProfile.brewingMethods, value))
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-200">Roast Preference</label>
          <select
            value={coffeeProfile.roastPreference}
            onChange={(event) => updateProfile("roastPreference", event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          >
            <option value="light">Light</option>
            <option value="medium-light">Medium Light</option>
            <option value="medium">Medium</option>
            <option value="medium-dark">Medium Dark</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-200">Bean Preference</label>
          <input
            type="text"
            value={coffeeProfile.beanPreference}
            onChange={(event) => updateProfile("beanPreference", event.target.value)}
            placeholder="single-origin arabica"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-200">
            Acidity Tolerance: {coffeeProfile.acidityTolerance}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={coffeeProfile.acidityTolerance}
            onChange={(event) => updateProfile("acidityTolerance", Number(event.target.value))}
            className="w-full accent-amber-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-200">Daily Cups</label>
          <input
            type="number"
            min="1"
            max="12"
            value={coffeeProfile.dailyCups}
            onChange={(event) => updateProfile("dailyCups", Number(event.target.value))}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-stone-200">Favorite Flavor Notes</label>
        <CheckboxGrid
          items={noteOptions}
          selected={coffeeProfile.flavorNotes}
          onToggle={(value) =>
            updateProfile("flavorNotes", toggleItem(coffeeProfile.flavorNotes, value))
          }
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-stone-200">Preferred Origins</label>
        <CheckboxGrid
          items={originOptions}
          selected={coffeeProfile.preferredOrigins}
          onToggle={(value) =>
            updateProfile("preferredOrigins", toggleItem(coffeeProfile.preferredOrigins, value))
          }
        />
      </div>

      <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/5 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-white">Smart Subscription</h4>
            <p className="mt-1 text-sm text-stone-400">
              Predict when you’ll run out and queue a replenishment reminder automatically.
            </p>
          </div>
          <label className="inline-flex items-center gap-2 text-sm text-white">
            <input
              type="checkbox"
              checked={smartSubscription.enabled}
              onChange={(event) =>
                onSmartSubscriptionChange({
                  ...smartSubscription,
                  enabled: event.target.checked,
                })
              }
            />
            Enabled
          </label>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-stone-200">
            Reminder lead time: {smartSubscription.reminderLeadDays} days
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={smartSubscription.reminderLeadDays}
            onChange={(event) =>
              onSmartSubscriptionChange({
                ...smartSubscription,
                reminderLeadDays: Number(event.target.value),
              })
            }
            className="w-full accent-emerald-400"
          />
        </div>
      </div>
    </div>
  );
};

export default CoffeeProfileFields;
