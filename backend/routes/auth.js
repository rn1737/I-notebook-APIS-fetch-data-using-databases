const express = require('express');
const router = express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator'); 
const bcrypt=require('bcrypt'); 
var jwt=require('jsonwebtoken'); 
var fetchuser=require('../middleware/fetchUser');  

const JWT_SECRET='Riteshisagoodb$oy'; 

// Router 1: Create a user string:"/api/auth/createuser".No login required 
router.post('/create user', [ 
  body('name','Enter a valid name').isLength({min:3}), 
  body('email','Enter a valid email').isEmail(),
  body('password','Password must be at least 5 characters').isLength({min:5}),
], async (req, res) => { 
  // IF THE ERRORS ,RETURN BAD REQUEST AND THE ERRORS //
  const errors = validationResult(req);
  if (!errors.isEmpty()){ 
    return res.status(400).json({errors:errors.array()});
  } 

  // check whether the user with this email exists already 
  try{ 
  let user = awaituser.findOne({ email: req.body.email }); 
  console.log(user)  
  if(user){ 
    return res.status(400).json({error:"Sorry a user with this email already exists"}) 
  }  
  const salt=awaitbcrypt.genSalt(10); 
  secPass= awaitbcrypt.hash(req.body.password,salt); 

  // create a new user 
  user.create({   
    username:req.body.name, 
    password:secPass,   
    email:req.body.email, 
  });  
  const data={ 
    user:{ 
      id:user.id 
    }
  }
  const authtoken=jwt.sign(data,JWT_SECRET); 
  console.log(jwtData); 

 // res.json(user) 
 res.json({authtoken})  
  
} catch(error) { 
  console.error(error.message); 
  res.status(500).send("Internal Server Error"); 
}
}); 
  // Router 2: Authentiaction a User Using: post "/api/auth/login".No login required  
  router.post('/login', [  
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(), 
  ], async (req, res) => {

    // IF THE ERRORS ,RETURN BAD REQUEST AND THE ERRORS //
  const errors = validationResult(req);
  if (!errors.isEmpty()){ 
    return res.status(400).json({errors:errors.array()});
  } 

  const{email,password}=req.body; 
  try{ 
    let user=User.findOne({email});
    if(!user){ 
      return res.status(400).json({error:"Please try to login with correct credentials"});  
    } 

    const passwordCompare=awaitbcrypt.compare(password, user.password); 
    if(!passwordCompare){ 
      return res.status(400).json({error:"Please try to login with correct credentials"});  
    } 

    const data={ 
      user:{ 
        id:user.id 
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET); 
    console.log({authtoken}); 

  } catch(error){  
      console.error(error.message); 
      res.status(500).send("Internal Server Error"); 
    }

  })  

  // Router 3: Get Loggedin user details using:Post"/api/auth/getuser".Login required
  router.post('/getUser',fetchuser,async (req, res) => {

  try{  
    userId="req.user.id"; 
    const user=awaituser.findById(userId).select("-password") 
    res.send(user); 
  } catch(error){  
      console.error(error.message); 
      res.status(500).send("Internal Server Error"); 
  }
}) 



module.exports = router; 