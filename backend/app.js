require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes')

const PORT = process.env.PORT || 8000

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true}
    )
    .then(()=>console.log("DB connected"))
    .catch(error=>console.log(error))

app.use(express.json())

app.use('/api/users',authRoutes);

app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT ${PORT}`);
})