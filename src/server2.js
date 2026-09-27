const express = require ("express");
const logger=require('./middleware/logger')
const hellomiddleware=require('./middleware/hellomiddleware')
const one=require('./middleware/one')
const two=require('./middleware/two')
const three=require('./middleware/three')
const app = express()
const cookieparser=require('cookie-parser')
app.use(cookieparser)
// sepecify the format will be in json
app.use(express.json())
app.use(express.static('public'))
const port = 3000

// connect the mongo db database
const mongoose=require('mongoose')
require('dotenv').config()

// importing user Schema
const User= require('./models/User')
// make route
app.post('/create/user',async(req,res,next)=>{
    try{
        // create a user
        const user=await User.create(req.body);//save user in database
        res.status(201).json({
            "sucess":true,
            data:user
        })
    }
    catch(error){
        res.status(400).json({
            "sucess":false,
            error:error.message
        })
    }
})

// login api
app.post('/read/user',async(req,res,next)=>{
    try{
        const token="randomgeneratedtoken";
        const user=User.findOne({email: req.body.email})
        if(user.password==req.body.password)
        {
            res.cookie("token",token,{
                httpOnly:true,
                secure:false,
                sameSite: "lax",
            }
            )
            // res.status(200).json({
            //     "token": token
            // })
            //login api
app.post('/login', async (req, res, next) => {
  try {
    console.log("login api called")
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      })
    }

    const user = await User.findOne({ email })

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    //issue token by backend
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    //save the token in cookie in frontend
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000
    })

    return res.status(200).jason 
    sucess :true 
    message: 'login sucessfull',
    token,
    user:{
        id:user._id
        name:user.name
        email:user.name
        age:user.age
    }
})

        }
    }catch(error){
        res.status(500).json({
        "message":error.message
        })
    }
})

// read
app.get('/read/user',async(req,res,next)=>{
    try{
        // ead a user
        const user=await User.find();//find all user in database
        res.status(201).json({
            "sucess":true,
            data:user
        })
    }
    catch(error){
        res.status(400).json({
            "sucess":false,
            error:error.message
        })
    }
})

// delete
app.delete('/delete/user', async (req, res, next) => {
    try {
        const password = req.query.password;
        const myuser = await User.findById(req.query.id);

        if (!myuser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (myuser.password == password) {
            console.log("password matched");
            const user = await User.findByIdAndDelete(req.query.id);
            return res.status(201).json({
                success: true,
                data: user
            });
        }

        console.log("password not matched");
        return res.status(403).json({
            message: "password not matched"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

//update all
app.put('/update/user:id',async(req,res,next)=>{
    try{
        // update all user
        console.log(req.query.id)
        const user=await User.findByIdAndUpdate(req.query.id,req.body,{new:true});//delete user in database
        res.status(201).json({
            "sucess":true,
            data:user
        })
    }
    catch(error){
        res.status(400).json({
            "sucess":false,
            error:error.message
        })
    }
})

// update one
app.patch('/update/user',async(req,res,next)=>{
    try{
        // update all user
        console.log(req.query.id)
        const user=await User.findByIdAndUpdate(req.query.id,req.body,{new:true});//delete user in database
        res.status(201).json({
            "sucess":true,
            data:user
        })
    }
    catch(error){
        res.status(400).json({
            "sucess":false,
            error:error.message
        })
    }
})

// connection
const connectDB= async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo db database connected sucessfully")
    }
    catch(error){
        console.error("error while connecting", error)
        process.exit(1);
    }
}


// for calling middleware we use app.use
app.use(logger);//global middleware

app.get('/',one,two,three,(req, res)=> {
    res.send('hello world!')
})

// making our first request
app.get("/hello",hellomiddleware,(req, res)=>{
    console.log("header value",req.headers.myheader)
    // getting parms
    console.log("params value,",req.query.myparams)
    // response
    res.status(200).json({
        "message":"hello"
    })
})

// endpoint post to get body
app.post("/data",(req,res)=>{
    console.log(req.body)
    res.status(200).json({
        message:"sucess"
    })  
})

app.get("/name",(req, res)=>{
    // response
    res.status(201).json({
        "name":"Filya"
    })
})

connectDB().then(()=>{
app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})
})