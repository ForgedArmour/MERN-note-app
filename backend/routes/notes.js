const express = require('express');
const router = express.Router();
var userHelpers = require('../helper/userHelper');
const Notes = require('../models/Notes');
const Notegroup = require('../models/Notegroup');
const { body, validationResult } = require('express-validator');

router.post('/createng',[ body('title','Title should contain atleast three character').isLength({min:3})],userHelpers.fetchUser,async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({status:"error"});
        }
        const ng = Notegroup({
            user:req.user.id,
            title:req.body.title
        })
        ng.save()
        return res.json({status:"ok",note_group:ng})
    }catch(err){
        return res.json({status:"error"})
    }
})
router.get('/fetchgroup',userHelpers.fetchUser,async (req,res)=>{
    try{
        const note_groups = await Notegroup.find({user:req.user.id}).sort({createdAt:-1})
        return res.json({status:"ok",notegroup:note_groups})
    }catch(err){
        return res.json({status:"error"})
    }
})
router.get('/fetchnotes/:groupId',userHelpers.fetchUser,async (req,res)=>{
    try{
        const notes = await Notes.find({group:req.params.groupId}).sort({createdAt:-1});
        return res.json({status:"ok",notes:notes});
    }catch(err){
        return res.json({status:"error"})
    }
})
router.post('/createnote/:groupId',[ body('title','Title should contain atleast one character').isLength({min:1})],userHelpers.fetchUser,async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({status:"error"});
        }
        else
        {
            const note = await Notes.create({
                group:req.params.groupId,
                title:req.body.title,
                description:req.body.description,
                tag:req.body.tag,
                user:req.user.id
            })
            return res.json({status:"ok",note:note});
        }
    }catch(err){
        return res.json({status:"error"})
    }
})
router.put('/updatenote/:noteId',[ body('title','Title should contain atleast one character').isLength({min:1})],userHelpers.fetchUser,async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({status:"error"})
        }
        else
        {
            const {title,description,tag} = req.body;//destructing the req.body object
            const newData={}
            if (title) {
                newData.title = title;
            }
            if (description) {
                newData.description = description;
            }
            if (tag) {
                newData.tag = tag;
            }
            const note = await Notes.findById(req.params.noteId);
            if (!note) {
                return res.json({status:"error"})
            }

            if (note.user.toString() !== req.user.id) {
                return res.json({status:"error"})
            }
                
            await Notes.findByIdAndUpdate(req.params.noteId,{$set:newData},{new:true});
            return res.json({status:"ok"})
        }
    }catch(err){
        return res.json({status:"error"})
    }
})
router.delete('/deletenote/:noteId',userHelpers.fetchUser,async (req,res)=>{
    try{
        const note = await Notes.findById(req.params.noteId);
        if (!note) {
            return res.json({status:"error"});
        }
        if (req.user.id !== note.user.toString()) {
            return res.json({status:"error"});
        }
        await Notes.findByIdAndDelete(req.params.noteId);
        return res.json({status:"ok"});
    }catch(err){
        return res.json({status:"error"})
    }
})
router.delete('/deletenotegp/:groupId',userHelpers.fetchUser,async (req,res)=>{
    try{
        const noteGroup = await Notegroup.findById(req.params.groupId);
        if (!noteGroup) {
            return res.send("error : not found");
        }
        if (req.user.id !== noteGroup.user.toString()) {
            return res.send("error : not found");
        }
        await Notes.deleteMany({group:req.params.groupId})
        await Notegroup.findByIdAndDelete(req.params.groupId);
        return res.json({status:"ok"});
    }catch(err){
        return res.json({status:"error"})
    }
})
module.exports = router;