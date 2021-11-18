require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const timeTableRoutes = require('./routes/timeTableRoutes')
const testRoutes = require('./routes/test')
const studentRoutes = require('./routes/student')
const dataRoutes = require('./routes/studentsPreference')
const teacherRoutes = require('./routes/teacher')

const PORT = process.env.PORT || 8000

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true}
    )
    .then(()=>console.log("DB connected"))
    .catch(error=>console.log(error))


app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/users',authRoutes);
app.use('/api/timetable',timeTableRoutes);
app.use('/api',testRoutes)
app.use('/api/student',studentRoutes);
app.use('/api',dataRoutes)
app.use('/api/teacher',teacherRoutes)

app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT ${PORT}`);
})