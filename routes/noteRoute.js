const jwt = require ('jsonwebtoken');
const checkToken = require('../middleware/checkToken');
const Note = require('../models/Note');
const User = require('../models/User');



module.exports = app =>{
  app.post('/api/createnote',checkToken,(req,res)=>{
    const {title, body, userId} = req.body;

    jwt.verify(req.session.token, process.env.JWTSECRET, (err, authData) =>{
      if(err){
        res.sendStatus(405);
      } else {
        const newNote = new Note({
          title,
          body,
          user: userId
        })
        newNote.save()
               .then(resp=>{
                 res.status (200).json ({type:'success',message: "note successfully saved"});
               })
               .catch(e=>{
                 console.log(e)
               })


      }
    })
  })
     
}