require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload');

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const timeTableRoutes = require('./routes/timeTableRoutes')
const studentRoutes = require('./routes/studentRoutes')
const dataRoutes = require('./routes/studentsPreferenceRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
const extraClassRoutes = require('./routes/extraClassRoutes')

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
app.use(fileUpload());

app.use('/api/user',userRoutes);
app.use('/api/users',authRoutes);
app.use('/api/timetable',timeTableRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/teacher',teacherRoutes);
app.use('/api/extraClass',extraClassRoutes);

app.use('/api',dataRoutes);

app.listen(PORT,()=>{
    console.log(`Server is up and running on PORT ${PORT}`);
})