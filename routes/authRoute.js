const User = require('../models/User');
module.exports = app=> {
   
  app.get('/api/login',(req,res)=>{
    const {username, password} = req.body;
    console.log(username)
      User.findOne({username})
          .then(resp=>{
            if(resp){
              console.log(resp)
            } else {
              res.status(401).json({errMessage: 'user not found'})
            }
          })
  }),

  app.post('/api/signup',(req,res)=>{
    const {username, password} = req.body;
      User.findOne({username})
          .then(resp=>{
            if (resp){
               res.status(202).json({errMessage: 'User already exists'});
               return
            }
          })
          .catch(err=>{
            res.status(500).json({errMessage: 'something went wrong'});
          })
        
      const newUser = new User({
        username,
        password
      })  

      newUser
          .save()
          .then(resp=>{
            req.session.username=username;
            res.status(200).json({message:"User successfully saved"})
          })
  })
   
}