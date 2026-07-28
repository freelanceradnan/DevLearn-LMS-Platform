import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(process.cwd(),'../../../server/.env')})
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || 'doguuyqrp',
  api_key: process.env.CLOUDINARY_API_KEY || '552463964929362',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Kqz073yTxqDo6hkG4gnDJYqy0EY',
});
console.log('key',process.env.CLOUDINARY_API_KEY)
export default cloudinary;

