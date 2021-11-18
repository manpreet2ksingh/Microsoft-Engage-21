const redis = require('redis');

const REDIS_PORT = process.env.PORT || 6379;

// Cache middleware

const cache = (req, res, next)=> {

    // const redisClient = redis.createClient(REDIS_PORT);

    // redisClient.on("error", function (err) {
    //     console.log("Error hello " + err);
        
    // });

    // const { day } = req.body;
  
    // redisClient.get(day, (err, data) => {
    //   if (err){
    //       res.send("Error")
    //   }
  
    //   else if (data !== null) {
    //     //   console.log("checking if already request is made or not to the same document")
    //     // // set timeout
    //     // next()
    //     res.send(data)
    //   } 
      
    //   else {
    //     next();
    //   }
    // });
    next()
  }

  module.exports = {cache}