const mongoose = require("mongoose");

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(
    MONGO_URI
)
.then(() => {
    console.log("MongoDB connected");
})
.catch(error => {
    console.error("MongoDB connection error: ", error);
});
