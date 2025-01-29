const mongoose = require("mongoose");
const Seller = require("./models/sellerSchema");
const Product = require("./models/productSchema");
const Order = require("./models/orderSchema");
const Customer = require("./models/customerSchema");

const seedDatabase = async () => {
    await mongoose.connect("mongodb+srv://vivekrajbansh:Vivek1234@ecommerce.ptq4r.mongodb.net/?retryWrites=true&w=majority&appName=ECommerce", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    await Seller.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Customer.deleteMany({});

    const sellers = await Seller.insertMany([
        { name: "John Doe", email: "john@example.com", password: "password", shopName: "John's Shop" },
        { name: "Jane Smith", email: "jane@example.com", password: "password", shopName: "Jane's Store" },
        { name: "Alice Brown", email: "alice@example.com", password: "password", shopName: "Alice's Market" },
        { name: "Bob Martin", email: "bob@example.com", password: "password", shopName: "Bob's Bazaar" },
        { name: "Charlie White", email: "charlie@example.com", password: "password", shopName: "Charlie's Goods" }
    ]);
    
    const products = await Product.insertMany([
        { productName: "Laptop", price: { mrp: 1000, cost: 900, discountPercent: 10 }, category: "Electronics", seller: sellers[0]._id },
        { productName: "Phone", price: { mrp: 500, cost: 450, discountPercent: 10 }, category: "Electronics", seller: sellers[1]._id },
        { productName: "Headphones", price: { mrp: 200, cost: 180, discountPercent: 10 }, category: "Accessories", seller: sellers[2]._id },
        { productName: "Shoes", price: { mrp: 100, cost: 90, discountPercent: 10 }, category: "Fashion", seller: sellers[3]._id },
        { productName: "Watch", price: { mrp: 300, cost: 250, discountPercent: 15 }, category: "Fashion", seller: sellers[4]._id }
    ]);
    
    const customers = await Customer.insertMany([
        { name: "David Green", email: "david@example.com", password: "password" },
        { name: "Emma Wilson", email: "emma@example.com", password: "password" },
        { name: "Michael Clark", email: "michael@example.com", password: "password" },
        { name: "Sophia Taylor", email: "sophia@example.com", password: "password" },
        { name: "Daniel Harris", email: "daniel@example.com", password: "password" }
    ]);
    
    await Order.insertMany([
        { buyer: customers[0]._id, orderedProducts: [{ productName: "Laptop", price: { mrp: 1000, cost: 900 }, quantity: 1, seller: sellers[0]._id }], paymentInfo: { id: "txn_123", status: "Paid" }, paidAt: new Date(), totalPrice: 900 },
        { buyer: customers[1]._id, orderedProducts: [{ productName: "Phone", price: { mrp: 500, cost: 450 }, quantity: 1, seller: sellers[1]._id }], paymentInfo: { id: "txn_456", status: "Paid" }, paidAt: new Date(), totalPrice: 450 },
        { buyer: customers[2]._id, orderedProducts: [{ productName: "Headphones", price: { mrp: 200, cost: 180 }, quantity: 1, seller: sellers[2]._id }], paymentInfo: { id: "txn_789", status: "Paid" }, paidAt: new Date(), totalPrice: 180 },
        { buyer: customers[3]._id, orderedProducts: [{ productName: "Shoes", price: { mrp: 100, cost: 90 }, quantity: 1, seller: sellers[3]._id }], paymentInfo: { id: "txn_012", status: "Paid" }, paidAt: new Date(), totalPrice: 90 },
        { buyer: customers[4]._id, orderedProducts: [{ productName: "Watch", price: { mrp: 300, cost: 250 }, quantity: 1, seller: sellers[4]._id }], paymentInfo: { id: "txn_345", status: "Paid" }, paidAt: new Date(), totalPrice: 250 }
    ]);
    
    console.log("Database seeded successfully!");
    mongoose.connection.close();
};

seedDatabase().catch(err => console.error(err));

module.exports = seedDatabase;
