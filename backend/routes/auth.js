const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var userHelpers = require('../helper/userHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/createuser',[  body('name','name should be atleast 3 characters').isLength({ min: 3 }),body('email','invalid email format').isEmail(), body('password','min length 5').isLength({min: 5}) ] , async (req,res)=>{
    let success = false;
    const errors = validationResult(req);//array of error objects

    //checking for errors in validation of req.body
    if (!errors.isEmpty()) {
        return res.send(errors)
    }
    else{
        //checking if user already exist with same email
            try
            {
                success=false;
                let user = await User.findOne({email:req.body.email})
                if (user) {
                    res.json({success,
                        error:"user with this email already exists"
                    })
                }
                else
                {
                    const salt = await bcrypt.genSalt(10)
                    const securePass = await bcrypt.hash(req.body.password,salt)
                    const user = await User.create({
                        name:req.body.name,
                        email:req.body.email,
                        password:securePass
                    })
                    
                    //payload data
                    const data = {
                        user:{
                            id:user.id
                        }
                    }
                    //generating authtoken from data and signing it
                    const authToken = jwt.sign(data,process.env.SECRETKEY)
                    success=true;
                    res.json({success,authToken});
                    
                    
                    
                }
            }catch(err)
            {
                res.send("some error occured in the server");
                console.log(err);
            }
            
            
    }
    
})
router.post('/userlogin',[ body('email','enter a valid email').isEmail(),body('password','password cannot be empty').exists() ],async (req,res)=>{
    
    let success = false;
    const error = validationResult(req);
    //checking errors in email and password
    if (!error.isEmpty()) {
       return res.send(error);
    }
    else
    {
        try
        {
            //fetching user with the email provided in request
            const user = await User.findOne({email:req.body.email})
            if (!user) { 
                return res.json({error:"Invalid credentials"});
            }
            //if user with that email exists then use bcrypt verify to verify password
            const passVerify = await bcrypt.compare(req.body.password,user.password);

            if (!passVerify) {
                success = false;
                return res.json({success,error:"Invalid credentials"});
            }
            
            //payload data
            const data = {
                user:{
                    id:user.id
                }
            }
            //after succesfull verification an auth token is sent to user
            const authToken = jwt.sign(data,process.env.SECRETKEY);
            success = true;
            res.json({success,authToken});
        }catch(err)
        {
            res.json({error:"server error"});
            console.log(err);
        }
    }
})
router.get('/getuser',userHelpers.fetchUser,async (req,res)=>{
    try
    {
        const user = await User.findOne({_id:req.user.id},{email:0,password:0,date:0});
        res.json({status:"ok",user:user});
    }catch(err)
    {
        res.json({status:"error"});
    }  
})
module.exports = router;