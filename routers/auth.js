import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express from 'express';
import { Router } from 'express';
import User from '../Schemas/users.js';
const router = Router();
const SECRET_KEY='UMARNAZIR';

router.post('/registration', async (req,res)=>{
    const formData=req.body;
    try{
      // const newUser=new User(req.body);
      const {email}=formData;
      const exist= await User.findOne({email})
      if (exist){
       return res.send({sussess:false,message:'User is already registered'})
      }
    
      const {password,...rest}=formData;
      const hashedpassword= await bcrypt.hash(password,10);
      const newUser=new User({...rest,password:hashedpassword});
      await newUser.save();
      return res.send({sussess:true,message:'data is reached'});
    }catch(err){
      console.log(err);
      res.send({success:false,message:'NO data in form'})
    }
  });

  router.post('/login',async (req,res)=>{
    const{email,password}=req.body;

    try{
      const user= await User.findOne({email})
      if(!user){
       return res.send({success:false,message:'user is invalid yet '})
      }
        const isMatch= await bcrypt.compare(password,user.password);
      
        if(!isMatch){
         return res.send({success:false,message:'your password is wrong'})
        }
        // username===dummyUser.username && password===dummyUser.password
        const token=jwt.sign(
         {id:user._id,email:user.email},
         SECRET_KEY,
         {expiresIn:'1h'}

        )
         res.send({sussess:true,token:token, message:'User is valid'});   
    }catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});
export default router;

