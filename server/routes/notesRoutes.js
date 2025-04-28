const auth = require('../middleware/authMiddleware');
const Note = require('../models/Note');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/',auth,async (req,res) =>{
    const {title,content,tags} = req.body;
    try{
    const note = new Note({user:req.user.id,title,content,tags});
    const savedNote =await note.save();
    res.status(201).json(savedNote);
    }catch(error) {
        res.status(500).json({message:error});
    }

});
router.get('/',auth,async (req,res)=>{
    try{
        const notes =await Note.find({user:req.user.id});
        res.status(200).json(notes);
    }catch(error){
        res.status(500).json({message:error});
    }
});
router.get('/:id',auth,async (req,res)=>{
    const id = req.params.id;
    try{
    const note = await Note.findOne({_id:id,user:req.user.id});
    if(!note){
        res.status(400).json({message:"Notes not found"});
    }
    res.status(200).json(note);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
})
router.put('/:id',auth,async (req,res)=>{
    const {title,content,tags} = req.body;
    const id = req.params.id;
    try{
        const updatedNote = await Note.findOneAndUpdate({_id:id, user:req.user.id},{title,content,tags},{new:true,runValidators: true});
        res.status(200).json(updatedNote);
    }catch(error){
        res.status(500).json(error);
    }
});
router.delete('/:id',auth,async (req,res)=>{
    const id=req.params.id;
    try{
        await Note.findOneAndDelete({_id:id, user:req.user.id});
        res.status(200).json({message:"User deleted successfully"});
    }catch(error){
        res.status(500).json(error);
    }
});

module.exports = router;