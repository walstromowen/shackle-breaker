import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(req, res){
     try{
          const {username, email, password} = req.body;

          //username check
          if(!username){
               return res.json({
                    error: 'username field is required.'
               })
          }
          //password checks
          if(!password){
               return res.json({
                    error: 'Password field is required.'
               })
          }
          if(password.length < 6){
               return res.json({
                    error: 'Password must be greater than 6 characters.'
               })
          }
          //email checks
          if(!email){
               return res.json({
                    error: 'Email field is required.'
               })
          }
          const exist = await UserModel.findOne({email});
          if(exist){
               return res.json({
                    error: 'Email is already taken.'
               })
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await UserModel.create({
               username: username,
               email: email, 
               password: hashedPassword,
          })
          return res.json(user)
     }catch(err){
          console.log(err)
     }
}

export async function loginUser(req, res){
     try{
          const {username, password} = req.body;
         
          //
          const user = await UserModel.findOne({username: username})
          
          if(!user){
               return res.json({
                    error: 'No user found'
               })
          }

          //Check if passwords match
          const match = await bcrypt.compare(password, user.password)
          if(match){
               jwt.sign({id: user._id}, process.env.JWT_SECRET, {}, (err, token)=>{
                    if(err) throw err;
                    res.cookie('token', token, {
                         sameSite: 'None',
                         secure: true,
                    }).json(user)
               })
          }
          if(!match){
               return res.json({
                    error: 'The password for the given user does not match.'
               })
          }
     }catch(err){
          console.log(err)
     }
}

export async function logoutUser(req, res){
     try{
          const token = req.cookies?.jwt;
          if (!token) return res.sendStatus(204); // no token — already logged out
          res.clearCookie('token');
          return res.sendStatus(204); // successful logout
     } catch (err) {
          console.log(err)
          return res.sendStatus(500);
     }
         
}
