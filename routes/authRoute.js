const User = require ('../models/User');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const checkToken = require('../middleware/checkToken');
const Note = require('../models/Note');

module.exports = app => {
  //login route
  app.post ('/api/login',(req, res) => {
    const {username, password} = req.body;
 //   console.log(username)
    User.findOne ({username}).then (resp => {
      if (resp) {
        if (bcrypt.compareSync (password, resp.password)) {
          
          req.session.user = resp;
          jwt.sign({resp},process.env.JWTSECRET, (err, token)=>{
            req.session.token = token;
            res.status (200).json ({type:'success', resp, token});
          })
        } else {
          res.send ({type:'error', message:'Wrong username or password'});
        }
      } else {
        res.send ({type: 'error', message: 'user not found'});
      }
    });
  }), 
  //signup route
  app.post ('/api/signup', (req, res) => {
    const {username, password} = req.body;
    User.findOne ({username})
      .then (resp => {
        if (resp) {
          //check if username exists
          res.send ({type:'error', message: 'User already exists'});
          return;
        }
      })
      .catch (err => {
        res.status (500).json ({type: 'error', message: 'something went wrong'});
      });

    //this says how much salt is required
    let salt = bcrypt.genSaltSync (10);

    let hash = bcrypt.hashSync (password, salt);

    const newUser = new User ({
      username,
      password: hash,
    });

    newUser.save ().then (resp => {
      req.session.user = resp;
      jwt.sign({resp},process.env.JWTSECRET, (err, token)=>{
        req.session.token = token;
        res.status (200).json ({type:'success',resp, token});
      })
    });
  });

  app.get('/api/logout',checkToken,(req,res)=>{
    jwt.verify (req.session.token, process.env.JWTSECRET, (err, authData) => {
      if (err) {
        res.sendStatus (405);
      } else {
        delete req.user;
        delete req.session.user;
        delete req.session.token;
        res.json ({success: 'success'});
      }
    });
  })

  //check if there is a logged in user in the session
    app.get('/api/getuser',checkToken,(req,res)=>{
      jwt.verify (req.session.token, process.env.JWTSECRET, (err, authData) => {
        if (err) {
          res.status (200).json ({type:'error',message: "invalid token"});
        } else {
          Note
            .find({user: req.session.user._id})
            .populate('user')
            .then(resp=>{
              res.status(200).json({type:'success',message: resp})
            })
            .catch(err=>{
              console.log(err)
              res.redirect('/') 
              })
        }
      });
    })
};
