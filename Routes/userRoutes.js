const express = require("express");
let router = express.Router();
let { Users } = require("../models/user.model");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

// const config = require("config");
router.post("/register", async (req, res) => {
   let user = await Users.findOne({ email: req.body.Emails });
   console.log(user,'tgyhj')
   if (user) return res.status(400).send("User with given Email already exist");
  let a
  try{
    let password = await bcrypt.hash( req.body.password, 12);
 a= await Users.create({name:'jhon',email : req.body.Emails,  password : password})
 console.log(a._id,a.password) }
  catch(err){
    console.log(err,'this error')
  }


  let token = jwt.sign(
    { _id: a._id, name: a.name, password:a.password },
     'key' );
     console.log('====================================');
     console.log(a.password,req.body);
     console.log('====================================');
  let datatoRetuen = {
    name: 'user.name',
    email: 'user.email',
    password:a.password,
    token:token,
   
  };
 return   res.send(datatoRetuen);
});
router.post("/login", async (req, res) => {
  console.log(req.body)
  let user = await Users.findOne({ email: req.body.Emails });
  if (!user) return res.status(400).send({message:"User Not Registered"});
 
  let isValid = await   bcrypt.compare(req.body.password, user.password);
console.log(user.password,req.body.password,isValid)  
  if (!isValid) return res.status(401).send({message:"Invalid Password"});
 try {
  let token =jwt.sign(
    { _id: user._id, name: user.name },'key'
   
  );
  res.send({token:token})
 } catch (error) {
  console.log(error)
 } 
 //const ismatch = await bcrypt.compare(password, Studentlogin.password);
  
});
module.exports = router;
