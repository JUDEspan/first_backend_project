const userModel = require("../model/user.model")
const bcrypt = require('bcrypt')
require("dotenv").config()
const jwt =require("jsonwebtoken")

const displayWelcome = (req, res) =>{
    res.send("Hello World");
    console.log("hell0");
}
const displayDash  = (req, res) =>{
    res.send("Dashboard");
    console.log("dash");
}
const register = (req, res)=>{
    console.log(req.body);
    let user = new userModel(req.body)
    user.save()
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
}
 const signin = (req,res) =>{
    //console.log(req.body);
    let {email, password} =req.body
    userModel
    .findOne({email : email})
    .then((user) =>{
        //console.log(user);
        user.comparedPassword(password, (err, result) => {
            console.log(result);
            res.send({ message:
            "user signed in successfully", status: true, user:result})
        });
 })
 .catch((err)=>console.log(err));
 }

module.exports= {displayWelcome, displayDash, register, signin}