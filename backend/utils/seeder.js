import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import connectDB from "../config/db.js";

dotenv.config();

connectDB();

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
            },
            {
                username: "John Doe",
                email: "john@example.com",
                password: hashedPassword,
                isAdmin: false,
            },
        ]);

        const adminUser = users[0]._id;

        console.log("Users Imported!");

        const categories = await Category.insertMany([
            { name: "Electronics" },
            { name: "Fashion" },
            { name: "Home" },
        ]);

        console.log("Categories Imported!");

        const products = [
            {
                name: "Wireless Headphones",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
                description: "High quality wireless headphones with noise cancellation.",
                brand: "SoundBrand",
                category: categories[0]._id,
                price: 89.99,
                countInStock: 10,
                rating: 4.5,
                numReviews: 12,
                quantity: 10,
            },
            {
                name: "Smart Watch",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
                description: "Track your fitness and stay connected.",
                brand: "TechTime",
                category: categories[0]._id,
                price: 199.99,
                countInStock: 5,
                rating: 4.0,
                numReviews: 8,
                quantity: 5,
            },
            {
                name: "Premium T-Shirt",
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
                description: "Cotton t-shirt for everyday comfort.",
                brand: "FashionCo",
                category: categories[1]._id,
                price: 29.99,
                countInStock: 20,
                rating: 5,
                numReviews: 4,
                quantity: 20,
            },
            {
                name: "Modern Lamp",
                image: "https://images.unsplash.com/photo-1507473888900-52e1adad5474?q=80&w=1000&auto=format&fit=crop",
                description: "Minimalist lamp for your desk.",
                brand: "HomeDeco",
                category: categories[2]._id,
                price: 49.99,
                countInStock: 15,
                rating: 4.8,
                numReviews: 10,
                quantity: 15,
            },
            {
                name: "Gaming Mouse",
                image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
                description: "Precision gaming mouse with RGB.",
                brand: "GamerGear",
                category: categories[0]._id,
                price: 59.99,
                countInStock: 8,
                rating: 4.7,
                numReviews: 20,
                quantity: 8,
            },
            {
                name: "Running Shoes",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
                description: "Comfortable running shoes for athletes.",
                brand: "Sporty",
                category: categories[1]._id,
                price: 129.99,
                countInStock: 12,
                rating: 4.2,
                numReviews: 15,
                quantity: 12,
            },
        ];

        // Convert to mongo schema compatible objects if needed (not strictly needed with insertMany)
        // But since schema has 'user' ref in product? 
        // Wait, checked Product model, there is NO 'user' field in Product schema provided in previous step.
        // There IS a 'user' field in 'reviewSchema', but not in 'productSchema' root.
        // Wait, let's re-read productModel.js
        // line 18: productSchema
        // line 24: category: { type: ObjectId, ref: "Category", required: true },
        // no user in root. Good.

        await Product.insertMany(products);

        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

// Mock Order model to delete orders
import mongoose_ from 'mongoose';
const orderSchema = new mongoose_.Schema({}, { strict: false });
const Order = mongoose_.models.Order || mongoose_.model("Order", orderSchema);


importData();
