import mongoose from "mongoose";
import path from 'path';


export const ConnectDB = async () => {
    try {
      
        const mongodbUrl = process.env.MONGODB_URL 

        if (!mongodbUrl) {
            throw new Error("Database URL is undefined in .env file!");
        }

        const result = await mongoose.connect(mongodbUrl, { autoIndex: true });
        console.log('MongoDB connection success!');
    } catch (error) {
        console.log('MongoDB connection failed!');
        console.error('Reason:', error.message); 
    }
};