const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";
const MONGO_URL =
  "mongodb+srv://kailash:VNiOxR3B7g58gsZs@cluster0.i9b8p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67efe28fd8d6628df017f576",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
