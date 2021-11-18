const Test = require('../models/test1');
const Request = require('../models/request')
const {MongoClient} = require('mongodb');
const request = require('../models/request');
require('dotenv').config();

const REDIS_PORT = process.env.PORT || 6379;

const BookSlot = async (req,res)=>{
    
    const {email,day} = req.body;
    // const redisClient = redis.createClient(REDIS_PORT);

    await Request.create({
        email
    })

    const uri = process.env.MONGO_URI;

    const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const session = client.startSession();

        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };

    try {

        // redisClient.setex(day, 120, "executing");
       
        const transactionResults = await session.withTransaction(async () => {
            
            await Request.updateOne({email},{
                $set:{"status":true}
            },
            {session})
           
            const check = await Test.findOne({day:"Monday"},{},{session});

            if(check.count == 0)
            {
                await session.abortTransaction();
                console.log("request rejected");
                return;
            }

            const result = await Test.updateOne({day:"Monday"},{
                $inc:{count:-1}
            },{session});            
            
            console.log(`Request accepted`,result)

            },transactionOptions);

            if (transactionResults) {
                console.log("Transaction successful")
                return res.status(201).json({
                    "response":"Transaction successful"
                })
            } 
            else {
                console.log("Transaction failed")
                return res.status(404).json({
                    "response":"Transaction failed"
                })
            }

    }
    catch (e) {
        console.log("The transaction was aborted due to an unexpected error: " + e)
    } finally {
        // Step 4: End the session
        await session.endSession();
    }

    } catch(e){
        console.log(e)
    }finally {
        await client.close();
    }
}

const sample = async (req,res)=>{
    res.status(201).json({
        "status":"request accepted"
    })

    const s = await request.create({
        email:"xyz",
        day:"Monday"
    })

    if(s){
        console.log(s);
    }
    else{
        console.log("error")
    }
}

module.exports = {BookSlot,sample};

