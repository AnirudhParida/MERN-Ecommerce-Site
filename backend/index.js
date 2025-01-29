const express = require("express")
const cors = require("cors")
const seedDatabase = require("./seed"); // Import the seed function
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = express()
const Routes = require("./routes/route.js")

const PORT = process.env.PORT || 5000

dotenv.config();

app.use(express.json({ limit: '10mb' }))
app.use(cors())

// mongoose
//     .connect("mongodb+srv://vivekrajbansh:Vivek1234@ecommerce.ptq4r.mongodb.net/?retryWrites=true&w=majority&appName=ECommerce", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(console.log("Connected to MongoDB"))
//     .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // Seed the database only in development mode
        if (process.env.SEED_DB === "true") {
            await seedDatabase();
            console.log("Mock data inserted successfully.");
        }
    } catch (err) {
        console.error("NOT CONNECTED TO NETWORK", err);
    }
};


connectDB();

app.use('/', Routes);

app.get("/test", (req, res) => {
    res.send("Hello from server")
})

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})