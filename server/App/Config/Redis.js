import Redis from 'ioredis';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    console.log(`Redis connected successfully`);
    return process.env.REDIS_URL;
  }
  throw new Error(`Redis connection failed: REDIS_URL is not defined in .env`);
};


export const redis = new Redis(getRedisUrl());
