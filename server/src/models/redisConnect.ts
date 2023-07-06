import { createClient } from "redis"

// Create a Redis instance to connect redis
const redisConnect = async()=>{
    //create client using upstash Redis URL
    const client = createClient ({
        url : process.env.Redis_URL
      });
      
      //check for error
      client.on("error", function(err) {
          console.log(err);
      });

      //connect to Redis
      await client.connect();
      console.log('Redis connected successfully');

      //return client to set and get the cache value
      return client;
}

export default redisConnect;