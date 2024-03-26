const express = require('express');
const router=express.Router(); 
var fetchuser=require('../middleware/fetchUser'); 
const { body, validationResult } = require('express-validator');
const notes=require('../models/Notes');
// ROUTE 1: Get ALL THE NOTES USING :GET "/api/auth/getuser".Login required 
router.get('/fetchallnotes',fetchuser,async(req,res)=>{  
    try{ 
        const notes=awaitNote.find({user:req,user,id}); 
        res.json(notes)  
    }catch (error){
            console.error(error.message); 
            res.status(500).send("Internal Server Error"); 
          }
})  

// ROUTE 2: ADD A NEW NOTE NOTES USING :GET "/api/auth/addnote".Login required 
router.post('/addnote',fetchuser,[ 
    body('title','Enter a valid title').isLength({min:3}), 
    body('pdescription','Password must be at least 5 characters').isLength({min:5}),], async (req, res) => {
        try{ 
     const {title,description,tag,}=req.body; 


    // IF THE ERRORS ,RETURN BAD REQUEST AND THE ERRORS //
    const errors = validationResult(req);
    if (!errors.isEmpty()){ 
      return res.status(400).json({errors:errors.array()});
    } 
    const note=newNote({ 
        title,description,tag,user:req.user.id
    })
    const savedNote=awaitnote.save() 
    res.json(savedNote) 
}  catch(error) { 
    console.error(error.message); 
    res.status(500).send("Internal Server Error"); 
  }

})  

// Route 3: Update an existing a Note using Put:"/api/notes/updatenote".Login required 
router.put('/updatenote/:id',fetchuser, async (req, res) => { 
  const{title,description,tag}=req.body; 
  // create a newNote object 
  const newNote={}; 
  if(title){newNote.title=title}; 
  if(description){newNote.description=description}; 
  if(tag){newNote.tag=tag};  

  // find the node to be updated // 
  let note=awaitnote.findById(req.params.id); 
  if(!note){return res.status(404).send("Not found")} 

  if(note.user.toString()!==req.user.id){ 
    return res.status(401).send("Not Allowed"); 
  }
  note=await note.findByIdAndUpdate(req.params.id,{set:newNote},{new:true}) 
  res.json({note}); 

  }) 

  // Route 4: delete an existing a Note using delete:"/api/notes/deletenote".Login required 
router.delete('/deletenote/:id',fetchuser, async (req, res) => { 
  const{title,description,tag}=req.body; 
 
  // find the node to be deleted and deleted // 
  let note=awaitnote.findById(req.params.id); 
  if(!note){return res.status(404).send("Not found")} 

  // ALLOW DELEETION ONLY IF USER OWNS THIS NOTE 
  if(note.user.toString()!==req.user.id){ 
    return res.status(401).send("Not Allowed"); 
  }
  note=await note.findByIdAndDelete(req.params.id) 
  res.json({"Success": "Note has been deleted",note:note});  

  }) 
module.exports=router