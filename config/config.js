const mongoose = require('mongoose');

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB via mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }

}

module.exports = {
    connectToMongoDB
};