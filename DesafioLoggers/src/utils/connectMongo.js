import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();


export const connectDB = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
};