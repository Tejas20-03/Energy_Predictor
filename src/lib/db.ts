import mongoose from "mongoose";

const Database_URl = process.env.DATABASE_URL;

if (!Database_URl) {
  throw new Error("Invalid Database URL");
}

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(Database_URl);
    console.log("MongoDb Connected");
  } catch (error) {
    console.error("Error connect to the DataBase");
    process.exit(1);
  }
};

export default connectDB;
