const Test = require('../models/test1');
const Request = require('../models/request')
const {MongoClient} = require('mongodb')
require('dotenv').config();

const book = async (client,email)=>{
    const session = client.startSession();

    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'local' },
        writeConcern: { w: 'majority' }
    };

    try {
        const status = true;
        const transactionResults = await session.withTransaction(async () => {
            
            const createRequest = await Request.create({
                email,
                status
            },{session})
           
            const check = await Test.findOne({day:"Monday"},{session});

            if(check.count == 0)
            {
                await session.abortTransaction();
                console.log("request rejected");
                return res.send("request rejected");
            }

            const result = await Test.UpdateOne({day:"Monday"},{
                $inc:{count:-1}
            },{session});            
            
            console.log(`Request accepted`,result)

            },transactionOptions);

            if (transactionResults) {
                return res.send("transaction successfull");
            } 
            else {
                return res.send("transaction failed");
            }

    }
    catch (e) {
        return res.send("The transaction was aborted due to an unexpected error: " + e)
    } finally {
        // Step 4: End the session
        await session.endSession();
    }
}

const BookSlot = async (req,res)=>{
    
    const {email} = req.body;

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
                return res.status(404).json({
                    result:"request rejected"
                })
            }

            const result = await Test.updateOne({day:"Monday"},{
                $inc:{count:-1}
            },{session});            
            
            console.log(`Request accepted`,result)

            },transactionOptions);

            if (transactionResults) {
                return res.send("transaction successfull");
            } 
            else {
                return res.send("transaction failed");
            }

    }
    catch (e) {
        return res.send("The transaction was aborted due to an unexpected error: " + e)
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

module.exports = {BookSlot};

