const express = require('express');
const logger = require('./logger');
const hellomiddleware = require('./hellomiddleware');
const one = require('./one');
const two = require('./two');
const three = require('./three');
const app = express();
//specify the format will be json
app.use(express.json());
app.use(express.static('public'));
const port = 3000;

//for calling middleware we use app.use
app.use(logger);

app.get('/', one, two, three,(req, res) => {
  res.send('Hello World!')
})

//making our first request
app.get("/name",hellomiddleware,(req,res)=>{
  //header value
  console.log("header value:",req.headers.myheader)
  //getting params
  console.log("params value:",req.query.myparams)
  //response
  res.status(201).json({
    "message":"Shrayo Maharjan"
  })
})

//endpoint post to get body
app.post("/data",(req,res)=>{
  console.log(req.body)
  res.status(200).json({
    message:"success"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})