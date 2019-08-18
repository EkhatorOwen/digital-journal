require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express()

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 60
    }
  })
)

app.get('/api',(req,res)=>{
  res.send('hello world')
})

app.listen(PORT, ()=>{
  console.log(` Now listening on port ${PORT}` )
})

