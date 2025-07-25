import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    // confirmpassword: Number,
    fullname: String,
    phonenumber: Number,
    postelcode:Number,
    streetadress:String,
    city:String,
    state:String
  });
 const User =  mongoose.model('users', userSchema);
   export default User;