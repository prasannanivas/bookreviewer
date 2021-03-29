const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.post('/register' , (req , res)=>{
    const username = req.body.username;
    const password = req.body.password
    db.query("INSERT into Users (username , password) VALUES (? , ?);" ,[username , password], (err , results)=>{
        console.log(err);
        res.send(results);
    })
})

router.post('/login' , (req , res)=>{
    const username = req.body.username;
    const password = req.body.password
    db.query("select * from Users where username = ? ;" ,[username], (err , results)=>{
        console.log("results : " , results);
        if(err){
            console.log(err);
            res.json({loggedIn : false , message : "Invalid credentials"});
        }
        if(results.length>0){
             if (password === results[0].Password){
                 res.json({loggedIn : true , username:username});
             }
             else{
                 res.json({loggedIn : false , message : "Invalid credentials"});
             }
        }
        else{
            res.json({loggedIn : false , message : "Invalid credentials"});
        }
    })
})

module.exports = router;