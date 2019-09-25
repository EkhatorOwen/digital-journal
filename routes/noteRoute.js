const jwt = require ('jsonwebtoken');
const checkToken = require('../middleware/checkToken');
const Note = require('../models/Note');



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

  app.put('/api/updatenote/:id',checkToken,(req,res)=>{

    jwt.verify(req.session.token, process.env.JWTSECRET, (err, authData)=>{

      const id = req.params.id;
      const data = req.body
      Note.findOneAndUpdate({_id: id},data, {new: true})
          .then(resp=>{
            Note.find({user: req.session.user._id})
                .populate('user')
                .then(resp=>{
                  res.status(200).json({type:'success', message: resp})

                })
          })
          .catch(err=>{
            console.log(err)
          })
    })
    
  })
     app.get('/api/getbooks',checkToken, (req,res)=>{
       jwt.verify(req.session.token, process.env.JWTSECRET,(err,authData)=>{
         if(err){
           //whenever there is an error, this should always redirect to the root
           res.redirect('/')
         } else {
          // if(!req.session._id){ return res.status(500).json({type:'error', message:'please log back in and try again'})}
           Note
              .find({user: req.session.user._id})
              .populate('user')
              .then(resp=>{
                res.status(200).json({type:'success', message: resp})
              })
              .catch(err=>{
                console.log(err)
                res.redirect('/')
              })
         }
       })
     })

     app.delete('/api/deletenote/:id',checkToken, (req,res)=>{
       jwt.verify(req.session.token, process.env.JWTSECRET,(err,authData)=>{
         const id = req.params.id;
         if(err){
           res.redirect('/')
         } else {
           Note
              .deleteOne({_id:id })
              .then(resp=>{
                 res.status(200).json({type:'success', message: resp})
              })
              .catch(err=>cosnole.log(err))
        
         }
       })
     })
}