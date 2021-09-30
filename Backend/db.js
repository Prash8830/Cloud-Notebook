const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connecToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to MongoDB Successfully!");
    })
}

module.exports = connecToMongo;