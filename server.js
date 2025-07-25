import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
// import { Router } from 'express';
// import User from './Schemas/users.js';
// import router from './routers/auth';
// const authRoutes=require('./routers/auth')
import authRoutes from './routers/auth.js';
const app= express();
const port=4000
app.use(cors());
app.use(express.json());
// const dummyUser={
//     username:'umarnazir@123.com',
//     password:'6666'
// };




mongoose.connect('mongodb://127.0.0.1:27017/login'
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  ).then(() => console.log("Umar MongoDB connected"))
    .catch(err => console.log(err));



    app.use('/api', authRoutes);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
//  