import ioredis, { Redis } from 'ioredis'
import dotenv from 'dotenv'
config({path:'../../../server/.env'})

const redisClient=()=>{
    if(process.env.REDIS_URL){
        console.log(`Redis connected`);
        return process.env.REDIS_URL
    }
    throw new Error(`Redis connection Failed!`)
}
export const redis=new Redis(redisClient)