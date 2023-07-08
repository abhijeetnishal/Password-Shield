import { Redis } from "@upstash/redis"

// Create a Redis instance to connect redis
const redisConnect = async()=>{
    //create client using upstash Redis url and token
    const client = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      
      return client;
}

export default redisConnect;