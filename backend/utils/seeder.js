import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import connectDB from "../config/db.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    const users = await User.insertMany([
      {
        username: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        isAdmin: true,
        coffeeProfile: {
          brewingMethods: ["espresso", "pour-over"],
          acidityTolerance: 4,
          roastPreference: "medium",
          beanPreference: "single-origin arabica",
          flavorNotes: ["citrus", "chocolate"],
          preferredOrigins: ["ethiopia", "colombia"],
          dailyCups: 3,
        },
        smartSubscription: {
          enabled: true,
          reminderLeadDays: 2,
        },
      },
      {
        username: "Lina Brewer",
        email: "lina@example.com",
        password: hashedPassword,
        isAdmin: false,
        coffeeProfile: {
          brewingMethods: ["aeropress", "pour-over"],
          acidityTolerance: 3,
          roastPreference: "light",
          beanPreference: "floral arabica",
          flavorNotes: ["berry", "floral"],
          preferredOrigins: ["ethiopia", "kenya"],
          dailyCups: 2,
        },
        smartSubscription: {
          enabled: true,
          reminderLeadDays: 2,
        },
      },
    ]);

    console.log("Users Imported!");

    const categories = await Category.insertMany([
      { name: "Single Origin" },
      { name: "Espresso Gear" },
      { name: "Brewing Equipment" },
    ]);

    console.log("Categories Imported!");

    const products = [
      {
        name: "Ethiopian Guji Bloom",
        image:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
        description:
          "Washed Ethiopian Arabica with jasmine aromatics, bergamot brightness, and a tea-like finish.",
        brand: "RoastFlow Reserve",
        category: categories[0]._id,
        productType: "beans",
        price: 22.5,
        countInStock: 18,
        rating: 4.9,
        numReviews: 18,
        quantity: 42,
        beanProfile: {
          origin: "Ethiopia",
          region: "Guji",
          species: "arabica",
          roastLevel: "light",
          acidity: 4,
          body: 3,
          processingMethod: "washed",
          tastingNotes: ["bergamot", "jasmine", "peach"],
          recommendedBrewingMethods: ["pour-over", "aeropress"],
          gramsPerBag: 250,
        },
        interactiveModel: {
          enabled: true,
          modelType: "coffee-bag",
          accentColor: "#f59e0b",
          hotspots: [
            { id: "1", label: "Valve", description: "One-way valve keeps aromatics intact." },
            { id: "2", label: "Roast Card", description: "Shows harvest and roast details." },
          ],
        },
      },
      {
        name: "Colombian Night Shift Espresso",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000&auto=format&fit=crop",
        description:
          "Dense caramel sweetness and cocoa depth engineered for syrupy espresso shots and milk drinks.",
        brand: "RoastFlow Reserve",
        category: categories[0]._id,
        productType: "beans",
        price: 19.99,
        countInStock: 24,
        rating: 4.8,
        numReviews: 11,
        quantity: 37,
        beanProfile: {
          origin: "Colombia",
          region: "Huila",
          species: "arabica",
          roastLevel: "medium-dark",
          acidity: 2,
          body: 4,
          processingMethod: "washed",
          tastingNotes: ["cocoa", "caramel", "orange"],
          recommendedBrewingMethods: ["espresso", "moka pot"],
          gramsPerBag: 500,
        },
        interactiveModel: {
          enabled: true,
          modelType: "coffee-bag",
          accentColor: "#b45309",
          hotspots: [
            { id: "1", label: "Blend Sheet", description: "Dial-in targets for espresso extraction." },
          ],
        },
      },
      {
        name: "Copper Lever Espresso Machine",
        image:
          "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=1000&auto=format&fit=crop",
        description:
          "A statement espresso machine with manual pressure control, polished metalwork, and café-grade temperature stability.",
        brand: "Forge Brew",
        category: categories[1]._id,
        productType: "equipment",
        price: 1299,
        countInStock: 4,
        rating: 4.7,
        numReviews: 6,
        quantity: 9,
        equipmentProfile: {
          equipmentType: "espresso machine",
          material: "copper and stainless steel",
          supportedBrewingMethods: ["espresso"],
        },
        interactiveModel: {
          enabled: true,
          modelType: "espresso-machine",
          accentColor: "#c2410c",
          hotspots: [
            { id: "1", label: "Steam Wand", description: "For textured milk and microfoam." },
            { id: "2", label: "Pressure Gauge", description: "Monitors extraction pressure in real time." },
          ],
        },
      },
      {
        name: "Monolith Hand Grinder",
        image:
          "https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=1000&auto=format&fit=crop",
        description:
          "Premium manual grinder with titanium burrs for espresso to pour-over precision and remarkably low retention.",
        brand: "Monolith",
        category: categories[2]._id,
        productType: "equipment",
        price: 289,
        countInStock: 12,
        rating: 4.9,
        numReviews: 14,
        quantity: 26,
        equipmentProfile: {
          equipmentType: "manual grinder",
          material: "anodized aluminum",
          supportedBrewingMethods: ["espresso", "pour-over", "aeropress"],
        },
        interactiveModel: {
          enabled: true,
          modelType: "manual-grinder",
          accentColor: "#92400e",
          hotspots: [
            { id: "1", label: "Burr Chamber", description: "Click-stepped burr adjustment system." },
            { id: "2", label: "Handle", description: "Balanced handle for smooth grinding." },
          ],
        },
      },
      {
        name: "Crystal Bloom Dripper",
        image:
          "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop",
        description:
          "Glass dripper built for high-clarity cups and precise bloom control on single-origin coffees.",
        brand: "Glassline",
        category: categories[2]._id,
        productType: "equipment",
        price: 42,
        countInStock: 20,
        rating: 4.6,
        numReviews: 8,
        quantity: 31,
        equipmentProfile: {
          equipmentType: "dripper",
          material: "borosilicate glass",
          supportedBrewingMethods: ["pour-over"],
        },
        interactiveModel: {
          enabled: true,
          modelType: "dripper",
          accentColor: "#f59e0b",
          hotspots: [
            { id: "1", label: "Ribs", description: "Promote airflow for even extraction." },
          ],
        },
      },
      {
        name: "Weekend Flight Subscription",
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
        description:
          "A rotating subscription of two curated 250g bags matched to your brew style and taste profile every cycle.",
        brand: "RoastFlow Reserve",
        category: categories[0]._id,
        productType: "subscription",
        price: 36,
        countInStock: 999,
        rating: 4.8,
        numReviews: 9,
        quantity: 55,
        beanProfile: {
          origin: "Rotating Origins",
          region: "Seasonal",
          species: "arabica",
          roastLevel: "medium",
          acidity: 3,
          body: 3,
          processingMethod: "mixed",
          tastingNotes: ["seasonal", "balanced", "curated"],
          recommendedBrewingMethods: ["espresso", "pour-over", "aeropress"],
          gramsPerBag: 500,
        },
        marketing: {
          subscriptionEligible: true,
          featuredHeadline: "Rotating bags matched to your evolving palate",
        },
      },
    ];

    await Product.insertMany(products);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
