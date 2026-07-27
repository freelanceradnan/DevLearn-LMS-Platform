import { redis } from "../Config/Redis.js";

export async function getMyInfo(userId){

const user=await redis.get(userId)
const newUser=JSON.parse(user)
return {success:true,info:newUser}
}