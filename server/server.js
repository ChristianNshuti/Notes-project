const express = require ('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const router= require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Server running......");
})

app.use('/api/notes',router);
app.use('/api/auth',authRoutes);

app.listen(PORT,() =>{
    console.log("Server running on ",PORT);
})

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("MongoDb connected successfully");
})
.catch((error)=>{
    console.log(error);
})