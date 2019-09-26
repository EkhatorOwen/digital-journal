require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose')
const cors = require('cors');
const PORT = process.env.PORT || 3001;



const authRoute = require(`${__dirname}/routes/authRoute`);
const noteRoute = require(`${__dirname}/routes/noteRoute`);

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
}


mongoose.connect(process.env.MONGO_URL).catch(err => {
  console.log("error connecting to DB:", err);
});

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

authRoute(app);
noteRoute(app)

app.post('/api',(req,res)=>{
  console.log(req.body)
  res.send('hello world')
})


app.listen(PORT, ()=>{
  console.log(` Now listening on port ${PORT}` )
})

